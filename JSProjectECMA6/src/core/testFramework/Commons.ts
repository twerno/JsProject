///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>

"use strict";

module testEC6 {

    export enum TestState { PENDING, WORKING, SUCCESS, FAILURE_EXCEPTION, FAILURE_ASSERTION, TIMEOUT, KILLED, SKIPPED }


    export class Result_Test {
        parent: Result_Group;
        name: string = null;

        state: TestState = TestState.PENDING;
        errorMsg: string = null;

        executionTime: number = 0;
        timeLimit: number = 0;
    }


    export class Result_Group {
        parent: Result_Root;
        groupId: string = null;

        state: TestState = TestState.PENDING;
        errorMsg: string = null;

        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        resultOfTests: Result_Test[] = [];
    }


    export class Result_Root {
        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        resultOfGroups: Result_Group[] = [];
        global_errors: string[] = [];
    }


    export type TestContext = Object;


    export interface ITestContextFactory {
        buildTestContext(): TestContext;
    }


    export abstract class IResultUpdateListener {
        abstract update( result: Result_Root, changes: Result_Group | Result_Test | Result_Test[] ): void;
    }
}
