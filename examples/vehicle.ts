import { inject, injectable } from '../src/index';

export interface IVehicle {
    accelerate(): void;
    checkSpeed(): string;
}

export const vehicleTypeIDs = Object.freeze({
    VEHICLE: Symbol('VEHICLE'),
});

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
