import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { ILoop } from './loop';

export interface ITight {
}

@injectable
export default class Tight implements ITight {
    constructor(
        @inject(cycleTypeIds.Loop) loop: ILoop,
    ) {
    }
}
