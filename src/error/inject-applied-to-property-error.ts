export class InjectAppliedToPropertyError extends Error {
    constructor() {
        super('Tried to apply @inject to property. It can only be applied to parameters');
    }
}
