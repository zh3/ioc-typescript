import { injectable } from '../';

export interface IUnnamedPrimitive {
    unnamed: any;
}

@injectable
export default class UnnamedPrimitive implements IUnnamedPrimitive {
    public unnamed: any;

    constructor(
        private wuh: string,
    ) {
    }
}
