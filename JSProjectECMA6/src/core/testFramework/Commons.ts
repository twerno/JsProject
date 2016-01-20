///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>

"use strict";

module testEC6 {

    export enum TestState { PENDING, WORKING, SUCCESS, FAILURE, TIMEOUT, KILLED, SKIPPED }


    export class TestCaseResult {
        parent: TestGroupResult;
        testId: string = null;

        state: TestState = TestState.PENDING;
        errorMsg: string = null;

        executionTime: number = 0;
        timeLimit: number = 0;
    }


    export class TestGroupResult {
        parent: TestResult;
        groupId: string = null;

        state: TestState = TestState.PENDING;
        errorMsg: string = null;

        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        testCaseResults: TestCaseResult[] = [];
    }


    export class TestResult {
        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        groupResults: TestGroupResult[] = [];
        global_errors: string[] = [];
    }


    export type TestContext = Object;


    export interface ITestContextFactory {
        buildTestContext(): TestContext;
    }


    export type TestResultUpdateHandler = (result: TestResult, updated: TestGroupResult|TestCaseResult) => void;
    
    
//    export abstract class IResultPainter {
//        resultUpdateHandler(result: Result, updated: GroupResult | TestResult): void { };
//    }

    export abstract class IResultUpdater {
        abstract update(result: TestResult, changes: TestGroupResult | TestCaseResult | TestCaseResult[]): void;
    }
}
