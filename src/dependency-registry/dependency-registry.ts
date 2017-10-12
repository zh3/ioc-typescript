import { CircularDependencyError, DependencyNotFoundError, InvalidTypeRegistrationError } from '../error';
import { getParameterMetadataList } from '../metadata/metadata-reader';
import { validateParameterMetadata } from '../metadata/metadata-validator';
import IParameterMetadata from '../metadata/parameter-metadata';
import updateParameterMetadata from '../metadata/update-parameter-metadata';
import ClassDependencyNode from './class-dependency-node';
import { IDependencyNode } from './dependency-node';
import findPath from './find-path';

export interface IDependencyRegistry {
    getInstance<T>(typeID: TypeID): T;
    registerDependency<T extends Newable>(typeId: TypeID, concreteType: T): DependencyRegistry;
    configureConstantNamedParameter<T extends Newable, ConstantType>(
        concreteType: T,
        name: string,
        constantValue: ConstantType,
    ): any;
}

export default class DependencyRegistry implements IDependencyRegistry {
    constructor(
        private dependenciesByType: Map<TypeID, IDependencyNode> = new Map<TypeID, IDependencyNode>(),
        private dependenciesByConcreteClass: Map<Newable, IDependencyNode> = new Map<Newable, any>(),
    ) {
    }

    public registerDependency<T extends Newable>(typeID: TypeID, concreteType: T): DependencyRegistry {
        if (!concreteType) {
            throw new InvalidTypeRegistrationError(typeID, concreteType);
        }

        validateParameterMetadata(concreteType);

        const pathConcreteTypeToTypeID = findPath(concreteType, typeID, this.dependenciesByType);
        if (pathConcreteTypeToTypeID) {
            throw new CircularDependencyError(typeID, pathConcreteTypeToTypeID);
        }

        const parameterMetadataList: IParameterMetadata[] = getParameterMetadataList(concreteType);
        const classDependencyNode: IDependencyNode = new ClassDependencyNode<T>(
            concreteType,
            parameterMetadataList,
        );
        this.dependenciesByType.set(typeID, classDependencyNode);
        this.dependenciesByConcreteClass.set(concreteType, classDependencyNode);

        return new DependencyRegistry(this.dependenciesByType, this.dependenciesByConcreteClass);
    }

    public configureConstantNamedParameter(
        concreteType: Newable,
        name: string,
        constantValue: any,
    ) {
        const dependencyNode: IDependencyNode = this.dependenciesByConcreteClass.get(
            concreteType,
        ) as IDependencyNode;
        dependencyNode.useNamedConstantDependency(name, constantValue);

        return new DependencyRegistry(this.dependenciesByType, this.dependenciesByConcreteClass);
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
