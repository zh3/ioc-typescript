export class DependencyNotFoundError extends Error {
    constructor(dependencyID: TypeID) {
        super(`No registered way to build dependency of type ${String(dependencyID)}`);
    }
}
