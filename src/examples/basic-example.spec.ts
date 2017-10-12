import { assert } from 'chai';
import Container from '../';
import {
    ExcitedCrowd,
    ICrowd,
} from '../test/crowd';
import {
    IRace,
    TimeTrial,
} from '../test/race';
import testTypeIDs from '../test/test-type-ids';
import {
    Car,
    IVehicle,
} from '../test/vehicle';

import {
    IPerson,
    Person,
} from '../test/person';

describe('basic usage', () => {
    it('should create dependency with no subdependencies', () => {
        const container: Container = new Container()
            .for<IVehicle>(testTypeIDs.VEHICLE).use(Car);
        const vehicle: IVehicle = container.getInstance<IVehicle>(testTypeIDs.VEHICLE);
        vehicle.accelerate();

        assert.equal(vehicle.checkSpeed(), 'current speed is: 50');
    });

    it('should create dependency with one level of subdependencies', () => {
        const container: Container = new Container()
            .for<IVehicle>(testTypeIDs.VEHICLE).use(Car)
            .for<IRace>(testTypeIDs.RACE).use(TimeTrial)
            .for<ICrowd>(testTypeIDs.CROWD).use(ExcitedCrowd);
        const race: IRace = container.getInstance<IRace>(testTypeIDs.RACE);
        const raceRecord = race.race();

        assert.deepEqual(raceRecord, [
            'current speed is: 0',
            'YAY!',
            'current speed is: 50',
            'YAY!',
        ]);
    });

    it('should create dependency with primitive dependencies', () => {
        const container: Container = new Container()
            .for<IPerson>(testTypeIDs.PERSON).use(Person);

        container.forConcreteType(Person)
            .forParamNamed('name').useConstantValue('August')
            .forParamNamed('age').useConstantValue(26)
            .forParamNamed('siblings').useConstantValue(['June', 'May']);

        const person: IPerson = container.getInstance<IPerson>(testTypeIDs.PERSON);
        const intro: string = person.introduce();

        assert.equal(intro, 'My name is August and I am 26. My siblings are June, May');
    });
});
