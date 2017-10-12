import { IDependencyRegistry } from '../dependency-registry/dependency-registry';
import Container from './container';
import ForConcreteTypeExpression from './for-concrete-type-expression';

export default class ForParamNamedExpression {
    constructor(
        private name: string,
        private concreteType: Newable,
        private dependencyRegistry: IDependencyRegistry,
    ) {
    }

    public useConstantValue(value: any): ForConcreteTypeExpression {
        this.dependencyRegistry = this.dependencyRegistry.configureConstantNamedParameter(
            this.concreteType,
            this.name,
            value,
        );

        return new ForConcreteTypeExpression(this.concreteType, this.dependencyRegistry);
    }
}
