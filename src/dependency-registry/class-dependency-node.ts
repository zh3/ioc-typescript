import IParameterMetadata from '../metadata/parameter-metadata';
import { DependencyResolver, IDependencyNode } from './dependency-node';

export default class ClassDependencyNode<T extends Newable> implements IDependencyNode {
    constructor(
        private ClassConstructor: Newable,
        public parameterMetadataList: IParameterMetadata[],
    ) {
    }

    public getDependency(resolveDependency: DependencyResolver): T {
        const dependencies: TypeID[] = this.parameterMetadataList.map(
            (parameterMetadata: IParameterMetadata) => parameterMetadata.typeID,
        );
        const params = dependencies.map(resolveDependency);
        return new this.ClassConstructor(...params);
    }
}
