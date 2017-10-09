import IParameterMetadata from '../metadata/parameter-metadata';

export type DependencyResolver = (TypeID) => any;

export interface IDependencyNode {
    parameterMetadataList: IParameterMetadata[];
    getDependency<T>(resolveDependency: DependencyResolver): any;
}
