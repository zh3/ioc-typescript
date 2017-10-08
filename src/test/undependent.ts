import { injectable } from '../';

export interface IUndependent {
    beBoring(): string;
}

@injectable
export default class Undependent implements IUndependent {
    public beBoring() {
        return '...';
    }
}
