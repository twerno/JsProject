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

    export enum TestSequenceResultState {
        PASSED, FAILED, RESOLVING_ERROR, TEST_ERROR, UNRESOLVED_TEST_LEFT
    }


    export interface ActionTestResult {
        id: string,
        actionClass: string,
        eventClass: string,
        chain: string[],
        state: TestResultState,
        param: {
            before: HsLogic.IActionParam,
            after: HsLogic.IActionParam
        },
        executionTime?: number
    }


    export interface TestSequenceResult {
        id: string,
        testTitle: string,
        testResults: ActionTestResult[],
        state: TestSequenceResultState,
        error: Error,
        consequencesMonitorExcludes: jsAction.IActionClass[]
    }


    export interface ActionTest {

        timeLimit?: number,

        actionClass: IActionClass,

        testable?: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean

        test: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean;
    }


    export interface ActionMonitor {
        actionTests: ActionTest[],
        consequencesMonitorExcludes?: jsAction.IActionClass[],
    }

    export interface Test {
        name?: string,
        errorMsg: string | ( ( hsGameCtx: HsGameCtx ) => string ),
        check: ( hsGameCtx: HsGameCtx ) => boolean
    }


    export interface TestSequence {
        hsGameCtxBuilder: () => HsGameCtx,
        actions: ( hsGameCtx: HsGameCtx ) => ActionType[],
        actionMonitor: ActionMonitor,
        //        actionTests: ActionTest[],
        //        consequencesMonitorExcludes?: jsAction.IActionClass[],
        tests: Test[]
    }

}