import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import F from './F';

@injectable
export default class D {
    constructor(
        @inject(cycleTypeIds.F) f: F,
    ) {
    }
}
