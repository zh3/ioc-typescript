import { assert } from 'chai';

import testTypeIDs from '../test/test-type-ids';
import Undependent, { IUndependent } from '../test/undependent';
import Uninjectable, { IUninjectable } from '../test/uninjectable';
import UnnamedPrimitive, { IUnnamedPrimitive } from '../test/unnamed-primitive';
import UnvaluedPrimitive, { IUnvaluedPrimitive } from '../test/unvalued-primitive';
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

    it('should throw error if dependency not injectable', () => {
        const notInjectableFactory = () => {
            const dependencyRegistry = new DependencyRegistry()
                .registerDependency(testTypeIDs.UNINJECTABLE, Uninjectable);
        };

        assert.throws(
            notInjectableFactory,
            'Class Uninjectable has not been made @injectable',
        );
    });

    it('should throw error if there is an unnamed primitive', () => {
        const unnamedPrimitiveFactory = () => {
            const dependencyRegistry = new DependencyRegistry()
                .registerDependency(testTypeIDs.UNNAMED_PRIMITIVE, UnnamedPrimitive);
        };

        assert.throws(
            unnamedPrimitiveFactory,
            'Parameter 0 of class constructor: UnnamedPrimitive must be named as it is primitive',
        );
    });

    it('should throw error if trying to construct class with unvalued primitives', () => {
        const unvaluedPrimitiveFactory = () => {
            const dependencyRegistry = new DependencyRegistry()
                .registerDependency(testTypeIDs.UNVALUED_PRIMITIVE, UnvaluedPrimitive);

            dependencyRegistry.getInstance<IUnvaluedPrimitive>(testTypeIDs.UNVALUED_PRIMITIVE);
        };

        assert.throws(
            unvaluedPrimitiveFactory,
            'Parameter named hmm of class UnvaluedPrimitive is primitive so a value must be provided',
        );
    });
});
