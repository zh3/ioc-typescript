export type DependencyResolver = (TypeID) => any;

export interface IDependencyNode {
    getDependency(resolveDependency: DependencyResolver): any;
}
