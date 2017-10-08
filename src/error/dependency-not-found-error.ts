export class DependencyNotFoundError extends Error {
    constructor(typeID: TypeID) {
        super(`No registered way to build dependency of type ${String(typeID)}`);
    }
}
