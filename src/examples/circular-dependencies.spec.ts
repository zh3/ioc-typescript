import { assert } from 'chai';
import Container from '../';
import { CircularDependencyError } from '../error/circular-dependency-error';

import A from '../test/cycle/A';
import B from '../test/cycle/B';
import C from '../test/cycle/C';
import D from '../test/cycle/D';
import E from '../test/cycle/E';
import F from '../test/cycle/F';

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
                .for<A>(cycleTypeIDs.Reflexive).use(Reflexive);
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
                .for<A>(cycleTypeIDs.Tight).use(Tight)
                .for<A>(cycleTypeIDs.Loop).use(Loop);
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
                .for<A>(cycleTypeIDs.A).use(A)
                .for<B>(cycleTypeIDs.B).use(B)
                .for<C>(cycleTypeIDs.C).use(C)
                .for<D>(cycleTypeIDs.D).use(D)
                .for<E>(cycleTypeIDs.E).use(E)
                .for<F>(cycleTypeIDs.F).use(F);
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
                .for<C>(cycleTypeIDs.C).use(C)
                .for<D>(cycleTypeIDs.D).use(D)
                .for<E>(cycleTypeIDs.E).use(E)
                .for<F>(cycleTypeIDs.F).use(F)
                .for<A>(cycleTypeIDs.A).use(A)
                .for<B>(cycleTypeIDs.B).use(B);
        };

        assert.throws(
            twoCycleTreeFactory,
            'Cannot register dependency for Symbol(B). Would form a cycle: ' +
             'Symbol(B) -> Symbol(C) -> Symbol(D) -> Symbol(F) -> Symbol(A) -> Symbol(B)',
        );
    });
});
