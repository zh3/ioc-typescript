export class CircularDependencyError extends Error {
    constructor(typeID: TypeID, pathToTypeID: TypeID[]) {
        const printPath = pathToTypeID.reduce(
            (acc, pathElement, index) => `${acc} -> ${String(pathElement)}`,
            `${String(typeID)}`,
        );
        super(`Cannot register dependency for ${String(typeID)}. Would form a cycle: ${printPath}`);
    }
}
