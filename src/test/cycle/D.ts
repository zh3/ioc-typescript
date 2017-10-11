import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IF } from './F';

export interface ID {
}

@injectable
export default class D implements ID {
    constructor(
        @inject(cycleTypeIds.F) f: IF,
    ) {
    }
}
