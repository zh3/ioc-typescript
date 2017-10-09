import { getParameterMetadataList } from '../metadata/metadata-reader';
import IParameterMetadata from '../metadata/parameter-metadata';
import { IDependencyNode } from './dependency-node';

interface ISearchNode {
    typeID: TypeID;
    searchParent?: ISearchNode;
}

function buildResultPath(endNode: ISearchNode): TypeID[] {
    let currentSearchNode = endNode;
    const resultPath = [];
    while (true) {
        resultPath.unshift(currentSearchNode.typeID);

        if (!currentSearchNode.searchParent) {
            break;
        }

        currentSearchNode = currentSearchNode.searchParent;
    }

    return resultPath;
}

function buildSearchNodes(
    parameterMetadataList: IParameterMetadata[],
    searchParent?: ISearchNode,
): ISearchNode[] {
    return parameterMetadataList.map((parameterMetadata: IParameterMetadata) => ({
        searchParent,
        typeID: parameterMetadata.typeID,
    }));
}

export default function findPath<T extends Newable>(
    sourceConcreteType: T,
    destinationTypeID: TypeID,
    dependenciesByType: Map<TypeID, IDependencyNode>,
): TypeID[] {
    const sourceDependencyParameterMetadata: IParameterMetadata[] = getParameterMetadataList(sourceConcreteType);
    const sourceDependencySearchNodes: ISearchNode[] = buildSearchNodes(sourceDependencyParameterMetadata);

    while (sourceDependencySearchNodes.length > 0) {
        const searchNode: ISearchNode = sourceDependencySearchNodes.shift();

        if (searchNode.typeID === destinationTypeID) {
            return buildResultPath(searchNode);
        }

        if (dependenciesByType.has(searchNode.typeID)) {
            const dependencyParameterMetadataList: IParameterMetadata[] = dependenciesByType.get(
                searchNode.typeID,
            ).parameterMetadataList;
            const dependencySearchNodes: ISearchNode[] = buildSearchNodes(
                dependencyParameterMetadataList,
                searchNode,
            );
            sourceDependencySearchNodes.unshift(...dependencySearchNodes);
        }
    }

    return null;
}
