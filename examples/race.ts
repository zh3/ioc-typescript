import { inject, injectable } from '../src/index';
import { crowdTypeIDs, ICrowd } from './crowd';
import { IVehicle, vehicleTypeIDs } from './vehicle';

export interface IRace {
    race(): string[];
}

export const raceTypeIDs = Object.freeze({
    RACE: Symbol('RACE'),
});

@injectable
export class TimeTrial implements IRace {
    constructor(
        @inject(crowdTypeIDs.CROWD) private crowd: ICrowd,
        @inject(vehicleTypeIDs.VEHICLE) private vehicle: IVehicle,
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
