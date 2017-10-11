export class InvalidTypeRegistrationError extends Error {
    constructor(typeID: TypeID, concreteType: any) {
        super(`Tried to register invalid value ${String(concreteType)} for type ID: ${String(typeID)}`);
    }
}
