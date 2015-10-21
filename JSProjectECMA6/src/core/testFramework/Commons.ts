///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>

"use strict";

module testEC6 {

    export enum TestResultState { NEW, WORKING, SUCCESS, FAILURE, TIMEOUT, KILLED, SKIPPED }


    export class TestResult {
        parent: GroupResult;
        testId: string = null;

        state: TestResultState = TestResultState.NEW;
        errorMsg: string = null;

        executionTime: number = 0;
        timeLimit: number = 0;
    }


    export class GroupResult {
        root: Result;
        groupId: string = null;

        state: TestResultState = TestResultState.NEW;
        errorMsg: string = null;

        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        tests: TestResult[] = [];
    }


    export class Result {
        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        groups: GroupResult[] = [];
        engine_errors: string[] = [];
    }


    export type TestContext = Object;


    export interface ITestContextFactory {
        buildTestContext(): TestContext;
    }


    export type TestResultUpdateHandler = (result: Result, updated: GroupResult|TestResult) => void;
    
    
//    export abstract class IResultPainter {
//        resultUpdateHandler(result: Result, updated: GroupResult | TestResult): void { };
//    }

    export abstract class IResultPainter {
        abstract resultUpdateHandler(result: Result, updated: GroupResult | TestResult | TestResult[]): void;
    }
}
