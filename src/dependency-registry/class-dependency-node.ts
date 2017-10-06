import { DependencyResolver, IDependencyNode } from './dependency-node';

export default class ClassDependencyNode implements IDependencyNode {
    constructor(
        private ClassConstructor: Newable,
        private dependencies: TypeID[]) {
    }

    public getDependency(resolveDependency: DependencyResolver) {
        const params = this.dependencies.map(resolveDependency);
        return new this.ClassConstructor(...params);
    }
}
