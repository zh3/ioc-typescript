import { inject, injectable } from '../index';
import { ICrowd } from './crowd';
import testTypeIDs from './test-type-ids';
import { IVehicle } from './vehicle';

export interface IRace {
    race(): string[];
}

@injectable
export class TimeTrial implements IRace {
    constructor(
        @inject(testTypeIDs.CROWD) private crowd: ICrowd,
        @inject(testTypeIDs.VEHICLE) private vehicle: IVehicle,
    ) {
    }

    public race(): string[] {
        const race = [];
        race.push(this.vehicle.checkSpeed());
        race.push(this.crowd.cheer());
        this.vehicle.accelerate();
        race.push(this.vehicle.checkSpeed());
        race.push(this.crowd.cheer());

        return race;
    }
}
