import { assert } from 'chai';
import Container from '../';
import { CircularDependencyError } from '../error/circular-dependency-error';

import ADirect from '../test/cycle/a-direct';
import BDirect from '../test/cycle/b-direct';

import A, { IA } from '../test/cycle/A';
import B, { IB } from '../test/cycle/B';
import C, { IC } from '../test/cycle/C';
import D, { ID } from '../test/cycle/D';
import E, { IE } from '../test/cycle/E';
import F, { IF } from '../test/cycle/F';

import Reflexive from '../test/cycle/reflexive';

import Loop from '../test/cycle/loop';
import Tight from '../test/cycle/tight';

import cycleTypeIDs from '../test/cycle/cycle-type-ids';

describe('circular dependencies', () => {
    it('should fail to instantiate reflexive dependency', () => {
        /*
         *      --------
         *      |      |
         *      v      |
         *  Reflexive -|
         *
         */
        const reflexiveFactory = () => {
            const container: Container = new Container()
                .for<IA>(cycleTypeIDs.Reflexive).use(Reflexive);
        };

        assert.throws(
            reflexiveFactory,
            'Cannot register dependency for Symbol(Reflexive). Would form a cycle: ' +
            'Symbol(Reflexive) -> Symbol(Reflexive)',
        );
    });

    it('should fail to instantiate tight loop', () => {
        /*
         *      ----- Loop
         *      |      ^
         *      v      |
         *    Tight ----
         *
         */
        const tightLoopFactory = () => {
            const container: Container = new Container()
                .for<IA>(cycleTypeIDs.Tight).use(Tight)
                .for<IA>(cycleTypeIDs.Loop).use(Loop);
        };

        assert.throws(
            tightLoopFactory,
            'Cannot register dependency for Symbol(Loop). Would form a cycle: ' +
            'Symbol(Loop) -> Symbol(Tight) -> Symbol(Loop)',
        );
    });

    it('should fail to make circular tree with 2 cycles', () => {
        /*
         *  ------> A <--
         *  |       |   |
         *  |       B   |
         *  |       |   |
         *  |       C - E
         *  |      /
         *  |     D
         *  |    /
         *  -- F
         *
         */
        const twoCycleTreeFactory = () => {
            const container: Container = new Container()
                .for<IA>(cycleTypeIDs.A).use(A)
                .for<IB>(cycleTypeIDs.B).use(B)
                .for<IC>(cycleTypeIDs.C).use(C)
                .for<ID>(cycleTypeIDs.D).use(D)
                .for<IE>(cycleTypeIDs.E).use(E)
                .for<IF>(cycleTypeIDs.F).use(F);
        };

        assert.throws(
            twoCycleTreeFactory,
            'Cannot register dependency for Symbol(E). Would form a cycle: ' +
             'Symbol(E) -> Symbol(A) -> Symbol(B) -> Symbol(C) -> Symbol(E)',
        );
    });

    it('should fail regardless of dependency registration order', () => {
        /*
         *  ------> A <--
         *  |       |   |
         *  |       B   |
         *  |       |   |
         *  |       C - E
         *  |      /
         *  |     D
         *  |    /
         *  -- F
         *
         */
        const twoCycleTreeFactory = () => {
            const container: Container = new Container()
                .for<IC>(cycleTypeIDs.C).use(C)
                .for<ID>(cycleTypeIDs.D).use(D)
                .for<IE>(cycleTypeIDs.E).use(E)
                .for<IF>(cycleTypeIDs.F).use(F)
                .for<IA>(cycleTypeIDs.A).use(A)
                .for<IB>(cycleTypeIDs.B).use(B);
        };

        assert.throws(
            twoCycleTreeFactory,
            'Cannot register dependency for Symbol(B). Would form a cycle: ' +
             'Symbol(B) -> Symbol(C) -> Symbol(D) -> Symbol(F) -> Symbol(A) -> Symbol(B)',
        );
    });


    it('should fail specifying parameter if modules directly depend on each other at import time', () => {
        /*
         *      ----- BDirect
         *      |        ^
         *      v        |
         *    ADirect ----
         *
         */
        const directCycleFactory = () => {
            const container: Container = new Container()
                .for<ADirect>(cycleTypeIDs.ADIRECT).use(ADirect)
                .for<BDirect>(cycleTypeIDs.BDIRECT).use(BDirect);
        };

        assert.throws(directCycleFactory, 'Parameter at index 0 of class BDirect is a circular dependency');
    });
});
