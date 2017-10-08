import { getDependencyIDs } from '../metadata/metadata-reader';
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

function buildSearchNodes(typeIDs: TypeID[], searchParent?: ISearchNode): ISearchNode[] {
    return typeIDs.map((typeID) => ({
        searchParent,
        typeID,
    }));
}

export default function findPath<T extends Newable>(
    sourceConcreteType: T,
    destinationTypeID: TypeID,
    dependenciesByType: Map<TypeID, IDependencyNode>,
): TypeID[] {
    const sourceDependencyTypeIDs: TypeID[] = getDependencyIDs(sourceConcreteType); // TODO handle other types
    const sourceDependencySearchNodes: ISearchNode[] = buildSearchNodes(sourceDependencyTypeIDs);

    while (sourceDependencySearchNodes.length > 0) {
        const searchNode: ISearchNode = sourceDependencySearchNodes.shift();

        if (searchNode.typeID === destinationTypeID) {
            return buildResultPath(searchNode);
        }

        if (dependenciesByType.has(searchNode.typeID)) {
            // TODO handle other types, don't break encapsulation
            const dependencyTypeIDs: TypeID[] = dependenciesByType.get(searchNode.typeID).dependencies;
            const dependencySearchNodes: ISearchNode[] = buildSearchNodes(dependencyTypeIDs, searchNode);
            sourceDependencySearchNodes.unshift(...dependencySearchNodes);
        }
    }

    return null;
}
