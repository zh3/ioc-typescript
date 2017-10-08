export type DependencyResolver = (TypeID) => any;

export interface IDependencyNode {
    getDependency<T>(resolveDependency: DependencyResolver): any;
}
