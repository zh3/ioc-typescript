import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IZ } from './Z';

export interface IY {
}

@injectable
export default class Y implements IY {
    constructor(
        @inject(cycleTypeIds.Z) b: IZ
    ) {
    }
}
