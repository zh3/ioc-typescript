export class PrimitiveNameRequiredError extends Error {
    constructor(name, index) {
        super(`Parameter ${index} of class constructor: ${name} must be named as it is primitive`);
    }
}
