import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import B from './B';

@injectable
export default class A {
    constructor(
        @inject(cycleTypeIds.B) b: B
    ) {
    }
}
