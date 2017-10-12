import { injectable, named } from '../';

export interface IPerson {
    introduce(): string;
}

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
