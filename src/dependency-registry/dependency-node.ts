export type DependencyResolver = (TypeID) => any;

export interface IDependencyNode {
    dependencies: TypeID[]; // TODO fix this being exposed directly
    getDependency<T>(resolveDependency: DependencyResolver): any;
}
