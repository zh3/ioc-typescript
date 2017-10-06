export class DuplicateInjectableError extends Error {
    constructor() {
        super('Tried to apply @injectable');
    }
}
