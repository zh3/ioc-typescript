export class InjectableRequiredError extends Error {
    constructor(name) {
        super(`Class ${name} has not been made @injectable`);
    }
}
