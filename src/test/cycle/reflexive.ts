import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';

@injectable
export default class Reflexive {
    constructor(
        @inject(cycleTypeIds.Reflexive) reflexive: Reflexive
    ) {
    }
}
