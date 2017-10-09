import { CircularDependencyError, DependencyNotFoundError } from '../error';
import { getParameterMetadataList } from '../metadata/metadata-reader';
import IParameterMetadata from '../metadata/parameter-metadata';
import ClassDependencyNode from './class-dependency-node';
import { IDependencyNode } from './dependency-node';
import findPath from './find-path';

export interface IDependencyRegistry {
    getInstance<T>(typeID: TypeID): T;
    registerDependency<T extends Newable>(typeId: TypeID, concreteType: T): DependencyRegistry;
}

export default class DependencyRegistry implements IDependencyRegistry {
    constructor(
        private dependenciesByType: Map<TypeID, IDependencyNode> = new Map<TypeID, IDependencyNode>(),
    ) {
    }

    public registerDependency<T extends Newable>(typeID: TypeID, concreteType: T): DependencyRegistry {
        const pathConcreteTypeToTypeID = findPath(concreteType, typeID, this.dependenciesByType);
        if (pathConcreteTypeToTypeID) {
            throw new CircularDependencyError(typeID, pathConcreteTypeToTypeID);
        }

        const parameterMetadataList: IParameterMetadata[] = getParameterMetadataList(concreteType);
        this.dependenciesByType.set(typeID, new ClassDependencyNode<T>(concreteType, parameterMetadataList));

        return new DependencyRegistry(this.dependenciesByType);
    }

    public getInstance<T>(typeID: TypeID): T {
        return this.buildDependencies(typeID) as T;
    }

    private buildDependencies(typeID: TypeID): any {
        if (!this.dependenciesByType.has(typeID)) {
            throw new DependencyNotFoundError(typeID);
        }

        const dependencyNode: IDependencyNode = this.dependenciesByType.get(typeID);

        const instance = dependencyNode.getDependency(this.buildDependencies.bind(this));
        return instance;
    }
}
