import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import C from './C';

@injectable
export default class B {
    constructor(
        @inject(cycleTypeIds.C) c: C
    ) {
    }
}
