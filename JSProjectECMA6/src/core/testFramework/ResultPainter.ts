///<reference path="../Utils.ts"/>
///<reference path="Commons.ts"/>
///<reference path="TestFramework.ts"/>

"use strict";

module testEC6 {

    export class LiveResultPainter extends IResultPainter {

        constructor(public target: HTMLElement) { super(); }

        resultUpdateHandler(testResult: Result, updated: GroupResult | TestResult): void {
            this.target.innerHTML = this._getHtml(testResult);
        };

        private _getHtml(testResult: Result): string {
            let html: string = `<p>Test results</p>`;
            if (testResult.engine_errors.length > 0)
                for (let s in testResult.engine_errors) {
                    html += `<p class='error'>${s}</p>`
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
            let html: string = `<p class="${this._state2CssClass(groupResult.state) }">`
                + groupResult.groupId
                + ((groupResult.errorMsg && groupResult.errorMsg.length > 0) ? ': ' + groupResult.errorMsg : '')
                + `</p>`
                + '<ul>';

            for (let i = 0; i < groupResult.tests.length; i++)
                html += `<li>${this._getTestHtml(groupResult.tests[i]) }</li>`;

            html += '</ul>'

            return html;
        }

        private _getTestHtml(testResult: TestResult): string {
            let html: string = `<p class="${this._state2CssClass(testResult.state) }">`
                + `${testResult.testId} ${this._msPrettyPrint(testResult.executionTime)} `
                + ((testResult.errorMsg && testResult.errorMsg.length > 0) ? ': ' + testResult.errorMsg : '')
                + `</p>`



            return html;
        }

        private _state2CssClass(state: TestResultState): string {
            if (state === TestResultState.FAILED
                || state === TestResultState.TIMEOUT
                || state === TestResultState.KILLED)
                return 'error';
            else if (state === TestResultState.SUCCESS)
                return 'success'
            else if (state === TestResultState.WORKING)
                return 'woring'
            else
                return 'new';
        }

        private _msPrettyPrint(milliseconds: number): string {
            return (Math.floor(milliseconds) / 1000).toString() + 's';
        }
    }
}