import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { ID } from './D';
import { IE } from './E';

export interface IC {
}

@injectable
export default class C implements IC {
    constructor(
        @inject(cycleTypeIds.D) d: ID,
        @inject(cycleTypeIds.E) e: IE
    ) {
    }
}
