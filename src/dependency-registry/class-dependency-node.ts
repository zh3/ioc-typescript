import { PrimitiveValueNotProvidedError } from '../error/primitive-value-not-provided-error';
import { isPrimitive } from '../metadata/compiler-serialized-types';
import IParameterMetadata from '../metadata/parameter-metadata';
import { DependencyResolver, IDependencyNode } from './dependency-node';

export default class ClassDependencyNode<T extends Newable> implements IDependencyNode {
    constructor(
        private ClassConstructor: Newable,
        public parameterMetadataList: IParameterMetadata[],
        private namedConstantDependencies: Map<string, any> = new Map<string, any>(),
    ) {
    }

    public useNamedConstantDependency(name: string, constant: any) {
        this.namedConstantDependencies.set(name, constant);
    }

    public getDependency(resolveDependency: DependencyResolver): T {
        const params: any[] = this.parameterMetadataList.map(
            (parameterMetadata: IParameterMetadata) => {
                return this.buildParameters(parameterMetadata, resolveDependency);
            },
        );

        return new this.ClassConstructor(...params);
    }

    private buildParameters(parameterMetadata: IParameterMetadata, resolveDependency: DependencyResolver) {
        const parameterName = parameterMetadata.name;
        if (parameterName && isPrimitive(parameterMetadata.compilerSerializedType)) {
            if (!this.namedConstantDependencies.has(parameterName)) {
                throw new PrimitiveValueNotProvidedError(
                    parameterName,
                    this.ClassConstructor.name,
                );
            }

            return this.namedConstantDependencies.get(parameterName);
        }

        return resolveDependency(parameterMetadata.typeID);
    }
}
