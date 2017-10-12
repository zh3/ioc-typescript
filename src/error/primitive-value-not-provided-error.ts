export class PrimitiveValueNotProvidedError extends Error {
    constructor(name, typeName) {
        super(`Parameter named ${name} of class ${typeName} is primitive so a value must be provided`);
    }
}
