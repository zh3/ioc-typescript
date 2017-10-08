import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import A from './A';

@injectable
export default class F {
    constructor(
        @inject(cycleTypeIds.A) A: A,
    ) {
    }
}
