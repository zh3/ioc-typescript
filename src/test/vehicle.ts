import { inject, injectable } from '../index';

export interface IVehicle {
    accelerate(): void;
    checkSpeed(): string;
}

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
