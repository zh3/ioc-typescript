import { IDependencyRegistry } from '../dependency-registry/dependency-registry';
import Container from '../fluent-interface/container';

export default class ForTypeExpression<T> {
    constructor(
        private typeID: TypeID,
        private dependencyRegistry: IDependencyRegistry,
    ) {
    }

    public use(concreteDependency: { new (...args: any[]): T }): Container {
        const dependencyRegistry = this.dependencyRegistry.registerDependency(this.typeID, concreteDependency);
        return new Container(dependencyRegistry);
    }
}
