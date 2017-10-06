import { assert } from 'chai';
import Container from '../src';
import {
    crowdTypeIDs,
    ExcitedCrowd,
    ICrowd,
} from './crowd';
import {
    IRace,
    raceTypeIDs,
    TimeTrial,
} from './race';
import {
    Car,
    IVehicle,
    vehicleTypeIDs,
} from './vehicle';

describe('basic usage', () => {
    it('should create dependency with no subdependencies', () => {
        const container: Container = new Container()
            .for<IVehicle>(vehicleTypeIDs.VEHICLE).use(Car);
        const vehicle: IVehicle = container.getInstance<IVehicle>(vehicleTypeIDs.VEHICLE);
        vehicle.accelerate();

        assert.equal(vehicle.checkSpeed(), 'current speed is: 50');
    });

    it('should create dependency with one level of subdependencies', () => {
        const container: Container = new Container()
            .for<IVehicle>(vehicleTypeIDs.VEHICLE).use(Car)
            .for<IRace>(raceTypeIDs.RACE).use(TimeTrial)
            .for<ICrowd>(crowdTypeIDs.CROWD).use(ExcitedCrowd);
        const race: IRace = container.getInstance<IRace>(raceTypeIDs.RACE);
        const raceRecord = race.race();

        assert.deepEqual(raceRecord, [
            'current speed is: 0',
            'YAY!',
            'current speed is: 50',
            'YAY!',
        ]);
    });
});
