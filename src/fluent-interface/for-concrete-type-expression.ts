import { IDependencyRegistry } from '../dependency-registry/dependency-registry';
import ForParamNamedExpression from './for-param-named-expression';

export default class ForConcreteTypeExpression {
    constructor(
        private concreteType: Newable,
        private dependencyRegistry: IDependencyRegistry,
    ) {
    }

    public forParamNamed(name: string): ForParamNamedExpression {
        return new ForParamNamedExpression(name, this.concreteType, this.dependencyRegistry);
    }
}
