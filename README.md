# ioc-typescript
Inversion of control container for Typescript.

This explores what is possible with [decorators](https://tc39.github.io/proposal-decorators/), currently a stage 2 draft and [reflect-metadata](https://rbuckton.github.io/reflect-metadata/), a stage 1 proposal. Decorators are usable with typescript / babel and a [shim](https://www.npmjs.com/package/reflect-metadata) exists for reflect-metadata.

## Installation
`reflect-metadata` needs to be included at the root of the project.
```
npm install reflect-metadata --save
```

TypeScript 2 is required as well as `experimentalDecorators`, `emitDecoratorMetadata` in tsconfig.json:
```
{
    "compilerOptions": {
        ...
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
## Running the project
```
npm install
```
Followed by
```
npm run test
```
It is possible to run just the examples
```
npm run test:example
```
## Usage
### Registering a dependency
A fluent interface based syntax based on [StructureMap](https://structuremap.github.io) is used to bind an abstract type to a concrete class constructor. The abstract type is represented by a `string` or `Symbol()`. This is necessary as interfaces cannot be be passed as values in Typescript. Typescript will enforce the concrete type passed to `use` matching the abstract type passed as the type argument to `for<>()`
```Typescript
        const container: Container = new Container()
            .for<IVehicle>(testTypeIDs.VEHICLE).use(Car);
```
### Annotating classes
Constructor injection is supported. Each class to be used as a dependency must be annotated with `@injectable`. Each parameter argument needs to be annotated with `@inject(typeID)` where the abstract type identifer is passed to `@inject`.
Vehicle.ts
```Typescript
import { inject, injectable } from '../index';

export interface IVehicle {
    accelerate(): void;
    checkSpeed(): string;
}
```
Car.ts
```Typescript
@injectable
export class Car implements IVehicle {
    private currentSpeed: number;

    constructor() {
        this.currentSpeed = 0;
    }

    public accelerate(): void {
        if (this.currentSpeed < 100) {
            this.currentSpeed += 50;
        }
    }

    public checkSpeed(): string {
        return `current speed is: ${this.currentSpeed}`;
    }
}
```
Crowd.ts
```Typescript
import { inject, injectable } from '../index';

export interface ICrowd {
    cheer(): string;
}

@injectable
export class ExcitedCrowd implements ICrowd {
    public cheer(): string {
        return 'YAY!';
    }
}
```
Race.ts
```Typescript
export interface IRace {
    race(): string[];
}

@injectable
export class TimeTrial implements IRace {
    constructor(
        @named('crowd') @inject(testTypeIDs.CROWD) private crowd: ICrowd,
        @inject(testTypeIDs.VEHICLE) @named('vehicle') private vehicle: IVehicle,
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
```
### Retrieving an instance
`getInstance<>()` is called for a particular type identifier and abstract type. If all necessary dependencies are registered with the container, it will autowire them and return an instance, otherwise a `DependencyNotFoundError` is thrown.
```Typescript
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
```
Primitives are never autowired, so concrete values must be provided for them explicitly in the constructor. Constructor parameters can be decorated with a name `@named` then their values provided using `forConcreteType`.

Person.ts
```
@injectable
export class Person implements IPerson {
    constructor(
        @named('name') private name: string,
        @named('age') private age: number,
        @named('siblings') private siblings: string[],
    ) {
    }

    public introduce(): string {
        const siblingIntro = this.siblings.reduce(
            (acc, sibling, i) => `${acc}${i === this.siblings.length - 1 ?  ',' : ''} ${sibling}`, '',
        );
        return `My name is ${this.name} and I am ${this.age}. My siblings are${siblingIntro}`;
    }
}
```
Providing constant values
```
        const container: Container = new Container()
            .for<IPerson>(testTypeIDs.PERSON).use(Person);

        container.forConcreteType(Person)
            .forParamNamed('name').useConstantValue('August')
            .forParamNamed('age').useConstantValue(26)
            .forParamNamed('siblings').useConstantValue(['June', 'May']);
```

## Circular dependency checking
Circular dependencies are checked for at the time of dependency registration. If a circular dependeny exists, an error specifying the cycle is shown.
```Typescript
        /*
         *  ------> A <--
         *  |       |   |
         *  |       B   |
         *  |       |   |
         *  |       C - E
         *  |      /
         *  |     D
         *  |    /
         *  -- F
         *
         */
        const twoCycleTreeFactory = () => {
            const container: Container = new Container()
                .for<A>(cycleTypeIDs.A).use(A)
                .for<B>(cycleTypeIDs.B).use(B)
                .for<C>(cycleTypeIDs.C).use(C)
                .for<D>(cycleTypeIDs.D).use(D)
                .for<E>(cycleTypeIDs.E).use(E)
                .for<F>(cycleTypeIDs.F).use(F);
        };

        assert.throws(
            twoCycleTreeFactory,
            'Cannot register dependency for Symbol(E). Would form a cycle: ' +
            'Symbol(E) -> Symbol(A) -> Symbol(B) -> Symbol(C) -> Symbol(E)',
        );
```
