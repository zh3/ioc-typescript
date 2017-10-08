import { injectable, inject } from '../../';
import cycleTypeIds from './cycle-type-ids';
import Tight from './tight';

@injectable
export default class Loop {
    constructor(
        @inject(cycleTypeIds.Tight) tight: Tight,
    ) {
    }
}
