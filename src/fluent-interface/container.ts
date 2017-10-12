import DependencyRegistry, { IDependencyRegistry } from '../dependency-registry/dependency-registry';
import ForConcreteTypeExpression from './for-concrete-type-expression';
import ForTypeExpression from './for-type-expression';

export default class Container {
    constructor(
        private dependencyRegistry: IDependencyRegistry = new DependencyRegistry(),
    ) {
    }

    public for<T>(typeID: TypeID): ForTypeExpression<T> {
        return new ForTypeExpression<T>(typeID, this.dependencyRegistry);
    }

    public forConcreteType(concreteType: Newable): ForConcreteTypeExpression {
        return new ForConcreteTypeExpression(concreteType, this.dependencyRegistry);
    }

    public getInstance<T>(typeID: TypeID): T {
        return this.dependencyRegistry.getInstance<T>(typeID);
    }
}
