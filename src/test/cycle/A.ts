import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IB } from './B';

export interface IA {
}

@injectable
export default class A implements IA {
    constructor(
        @inject(cycleTypeIds.B) b: IB
    ) {
    }
}
