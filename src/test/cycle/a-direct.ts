import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import BDirect from './b-direct';

@injectable
export default class ADirect {
    constructor(
        @inject(cycleTypeIds.BDIRECT) bdirect: BDirect,
    ) {
    }
}
