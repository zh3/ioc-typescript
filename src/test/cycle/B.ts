import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IC } from './C';

export interface IB {
}

@injectable
export default class B implements IB {
    constructor(
        @inject(cycleTypeIds.C) c: IC
    ) {
    }
}
