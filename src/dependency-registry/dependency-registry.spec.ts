import { assert } from 'chai';

import testTypeIDs from '../test/test-type-ids';
import Undependent, { IUndependent } from '../test/undependent';
import DependencyRegistry from './dependency-registry';

describe('should register dependencies', () => {
    it('should add new dependency to dependency registry', () => {
        const dependencyRegistry = new DependencyRegistry()
            .registerDependency(testTypeIDs.UNDEPENDENT, Undependent);

        const undependent: IUndependent = dependencyRegistry.getInstance<IUndependent>(testTypeIDs.UNDEPENDENT);
        assert.equal(undependent.beBoring(), '...');
    });

    it('should throw error if undefined provided', () => {
        const badUndependentFactory = () => {
            const dependencyRegistry = new DependencyRegistry()
                .registerDependency(testTypeIDs.UNDEPENDENT, undefined);
        };

        assert.throws(
            badUndependentFactory,
            'Tried to register invalid value undefined for type ID: Symbol(UNDEPENDENT)',
        );
    });
});
