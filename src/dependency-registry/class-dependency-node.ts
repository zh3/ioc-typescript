import { DependencyResolver, IDependencyNode } from './dependency-node';

export default class ClassDependencyNode<T extends Newable> implements IDependencyNode {
    constructor(
        private ClassConstructor: Newable,
        public dependencies: TypeID[]) {
    }

    public getDependency(resolveDependency: DependencyResolver): T {
        const params = this.dependencies.map(resolveDependency);
        return new this.ClassConstructor(...params);
    }
}
