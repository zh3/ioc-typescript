export class DirectCircularDependencyError extends Error {
    constructor(typeName: string, paramIndex: number) {
        super(`Parameter at index ${paramIndex} of class ${typeName} is a circular dependency`);
    }
}
