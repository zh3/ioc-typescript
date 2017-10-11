import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IA } from './A';

export interface IF {
}

@injectable
export default class F implements IF {
    constructor(
        @inject(cycleTypeIds.A) a: IA,
    ) {
    }
}
