export interface IUninjectable {
    uninjectable(): any;
}

export default class Uninjectable {
    public uninjectable(): any {
        return 'uninjectable';
    }
}
