import { assert } from 'chai';
import { injectable } from './injectable';

describe('injectable', () => {
    it('should throw error if @injectable used multiple times', () => {
        const multipleInjectableFactory = () => {
            @injectable @injectable
            class Unremarkable {
            }

            return Unremarkable;
        };

        assert.throws(multipleInjectableFactory, 'Tried to apply @injectable multiple times');
    });
});
