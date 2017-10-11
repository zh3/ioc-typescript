import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { ITight } from './tight';

export interface ILoop {
}

@injectable
export default class Loop implements ILoop {
    constructor(
        @inject(cycleTypeIds.Tight) tight: ITight,
    ) {
    }
}
