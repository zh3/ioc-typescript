export class InjectableRequiredError extends Error {
    constructor(name, index) {
        super(`Parameter ${index} of class constructor: ${name} has no type symbol defined with @injectable`);
    }
}
