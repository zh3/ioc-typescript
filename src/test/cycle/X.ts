import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IZ } from './Z';

export interface IX {
}

@injectable
export default class X implements IX {
    constructor(
        @inject(cycleTypeIds.Z) b: IZ
    ) {
    }
}
