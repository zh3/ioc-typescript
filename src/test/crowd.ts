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
