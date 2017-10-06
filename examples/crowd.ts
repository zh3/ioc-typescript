import { inject, injectable } from '../src/index';

export interface ICrowd {
    cheer(): string;
}

export const crowdTypeIDs = Object.freeze({
    CROWD: Symbol('CROWD'),
});

@injectable
export class ExcitedCrowd implements ICrowd {
    public cheer(): string {
        return 'YAY!';
    }
}
