import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import ADirect from './a-direct';

@injectable
export default class BDirect {
    constructor(
        @inject(cycleTypeIds.ADIRECT) adirect: ADirect,
    ) {
    }
}
