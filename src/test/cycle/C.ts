import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import D from './D';
import E from './E';

@injectable
export default class C {
    constructor(
        @inject(cycleTypeIds.D) d: D,
        @inject(cycleTypeIds.E) e: E
    ) {
    }
}
