import { injectable, named } from '../';

export interface IUnvaluedPrimitive {
    unvalued: any;
}

@injectable
export default class UnvaluedPrimitive implements IUnvaluedPrimitive {
    public unvalued: any;

    constructor(
        @named('hmm') private hmm: string,
    ) {
    }
}
