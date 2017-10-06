declare type TypeID = string | symbol;
declare interface Newable {
    new(...args: any[]): any;
}
