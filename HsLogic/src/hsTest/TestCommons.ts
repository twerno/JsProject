"use strict";

namespace HsTest {

    // aliases
    export type IActionClass = jsAction.IActionClass;
    export type ActionType = HsLogic.ActionType;
    export type HsGameCtx = HsLogic.HsGameCtx;
    export type Player = HsLogic.Player;
    export type Zones = HsLogic.Zones;
    export type Card = HsLogic.Card;
    export type ICard = Def.ICard;
    export type IMinion = Def.IMinion;
    export type IWeapon = Def.IWeapon;



    export enum TestResultState {
        NOT_RESOLVABLE, RESOLVING, UNTESTED, PASSED, FAILED, RESOLVING_ERROR, TEST_ERROR
    }


    export interface TestResult {
        actionClass: string,
        state: TestResultState,
        param: {
            before: HsLogic.IActionParam,
            after: HsLogic.IActionParam
        },
        executionTime?: number
    }


    export interface TestSequenceResult {
        testClass: string,
        testResults: TestResult[],
        error: Error
    }


    export interface Test {

        timeLimit?: number,

        respondsTo: IActionClass,

        testable?: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean

        test: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean;
    }


    export interface TestSequence {
        hsGameCtxBuilder: () => HsGameCtx,
        action: () => ActionType,
        tests: Test[]
    }

}