///<reference path="../Utils.ts"/>
///<reference path="Commons.ts"/>
///<reference path="TestFramework.ts"/>

"use strict";

module testEC6 {

    export class LiveResultPainter extends IResultPainter {

        constructor(public target: HTMLElement) { super(); }

        resultUpdateHandler(testResult: Result, updated: GroupResult | TestResult | TestResult[]): void {
            this.target.innerHTML = this._getHtml(testResult);
        };

        private _getHtml(testResult: Result): string {
            let html: string = `<div class="page-header"><h1>Test results <small>`
                +` <span class="badge">${testResult.allTestCount}</span>`
                +` <span class="badge success_bgr">${testResult.succeedCount}</span>`
                +` <span class="badge error_bgr">${testResult.failedCount}</span>`
                +`</small></h1></div>`;
            if (testResult.engine_errors.length > 0) {
                html += `<div class="alert alert-danger box" role="alert"><ul class='box'>`;
                for (let err of testResult.engine_errors) 
                    html += `<li><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ${err}</li>`;
                html += '</ul></div>';
            }

            html += `<ul> ${this._getGroupsHtml(testResult) } </ul>`;

            return html;
        }

        private _getGroupsHtml(testResult: Result): string {
            let html: string = '';
            for (let i = 0; i < testResult.groups.length; i++)
                html += this._getGroupHtml(testResult.groups[i]);

            return html;
        }

        private _getGroupHtml(groupResult: GroupResult): string {
            let html: string = this._getGroupHeader(groupResult);
            html += '<ul>'

            for (let i = 0; i < groupResult.tests.length; i++)
                html += `<li>${this._getTestHtml(groupResult.tests[i]) }</li>`;

            html += '</ul>'

            return html;
        }

        private _getTestHtml(testResult: TestResult): string {
            let testMessage: string = this._getMessage(testResult.state, testResult.errorMsg);

            return `<p>
            	<b class="${this._state2CssClass(testResult.state) }">${testResult.testId}</b>
            		(${this._msPrettyPrint(testResult.executionTime) }):
            			<span class="${this._state2CssClass(testResult.state) }">${testMessage}</span>
            	</p>`;
        }

        private _getGroupHeader(groupResult: GroupResult): string {
            let errorMsg: string = '';
            if (groupResult.errorMsg)
                errorMsg = `: <span class="${this._state2CssClass(groupResult.state) }">${groupResult.errorMsg}</span>`
            else
                errorMsg = '';

            return `<p>
            	<b class="${this._state2CssClass(groupResult.state) }">${groupResult.groupId}</b>
            		(${this._msPrettyPrint(groupResult.executionTime) })
            	${errorMsg}
            	</p>`;
        }

        private _state2CssClass(state: TestResultState): string {
            if (state === TestResultState.FAILURE
                || state === TestResultState.TIMEOUT
                || state === TestResultState.KILLED)
                return 'error';
            else if (state === TestResultState.SUCCESS)
                return 'success'
            else if (state === TestResultState.WORKING)
                return 'working'
            else
                return 'new';
        }

        private _msPrettyPrint(milliseconds: number): string {
            return (Math.ceil(milliseconds / 10) / 100).toString() + 's';
        }

        private _getMessage(testState: TestResultState, errorMsg: string): string {
            if (testState === TestResultState.FAILURE
                || testState === TestResultState.TIMEOUT)
                return errorMsg || 'Unknown error!';
            else if (testState === TestResultState.KILLED)
                return 'Killed by user!';
            else if (testState === TestResultState.SUCCESS)
                return 'OK'
            else if (testState === TestResultState.WORKING)
                return 'Testing...'
            else if (testState === TestResultState.SKIPPED)
                return 'Skipped';
            else
                return 'Pending';
        }
    }
}