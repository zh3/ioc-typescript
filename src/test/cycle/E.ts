import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import { IA } from './A';

export interface IE {
}

@injectable
export default class E implements IE {
    constructor(
        @inject(cycleTypeIds.A) a: IA,
    ) {
    }
}
