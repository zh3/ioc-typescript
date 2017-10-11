import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IY } from './Y';

export interface IZ {
}

@injectable
export default class Z implements IZ {
    constructor(
        @inject(cycleTypeIds.Y) a: IY,
    ) {
    }
}
