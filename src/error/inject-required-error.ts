export class InjectRequiredError extends Error {
    constructor(name, index) {
        super(`Parameter ${index} of class constructor: ${name} has no type symbol defined with @inject`);
    }
}
