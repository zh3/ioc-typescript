import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import Loop from './loop';

@injectable
export default class Tight {
    constructor(
        @inject(cycleTypeIds.Loop) loop: Loop,
    ) {
    }
}
