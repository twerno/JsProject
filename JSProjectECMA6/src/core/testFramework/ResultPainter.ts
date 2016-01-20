///<reference path="../Utils.ts"/>
///<reference path="Commons.ts"/>
///<reference path="TestFramework.ts"/>

"use strict";

module testEC6 {

    export class LiveResultPainter extends IResultUpdateListener {

        constructor( public target: HTMLElement ) { super(); }


        update( testResult: Result_Root, changes: Result_Group | Result_Test | Result_Test[] ): void {
            this.target.innerHTML = this._getHtml( testResult );
        };


        private _getHtml( testResult: Result_Root ): string {
            let html: string = `<div class="page-header"><h1>Test results <small>`
                + ` <span class="badge">${testResult.allTestCount - testResult.succeedCount - testResult.failedCount}</span>`
                + ` <span class="badge success_bgr">${testResult.succeedCount}</span>`
                + ` <span class="badge error_bgr">${testResult.failedCount}</span>`
                + `</small></h1></div>`;
            if ( testResult.global_errors.length > 0 ) {
                html += `<div class="alert alert-danger box" role="alert"><ul class='box'>`;
                for ( let err of testResult.global_errors )
                    html += `<li><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ${err}</li>`;
                html += '</ul></div>';
            }

            html += `<ul> ${this._getGroupsHtml( testResult )} </ul>`;

            return html;
        }


        private _getGroupsHtml( testResult: Result_Root ): string {
            let html: string = '';
            for ( let i = 0; i < testResult.resultOfGroups.length; i++ )
                html += this._getGroupHtml( testResult.resultOfGroups[i] );

            return html;
        }


        private _getGroupHtml( groupResult: Result_Group ): string {
            let html: string = this._getGroupHeader( groupResult );
            html += '<ul>'

            for ( let i = 0; i < groupResult.resultOfTests.length; i++ )
                html += `<li>${this._getTestHtml( groupResult.resultOfTests[i] )}</li>`;

            html += '</ul>'

            return html;
        }


        private _getTestHtml( testResult: Result_Test ): string {
            let testMessage: string = this._messageFromState( testResult.state, testResult.errorMsg );

            return `<p>
            	<b class="${this._state2CssClass( testResult.state )}">${testResult.name}</b>
            		(${this._msPrettyPrint( testResult.executionTime )}):
            			<span class="${this._state2CssClass( testResult.state )}">${testMessage}</span>
            	</p>`;
        }


        private _getGroupHeader( groupResult: Result_Group ): string {
            let errorMsg: string = '';
            if ( groupResult.errorMsg )
                errorMsg = `: <span class="${this._state2CssClass( groupResult.state )}">${groupResult.errorMsg}</span>`
            else
                errorMsg = '';

            return `<p>
            	<b class="${this._state2CssClass( groupResult.state )}">${groupResult.groupId}</b>
            		(${this._msPrettyPrint( groupResult.executionTime )})
            	${errorMsg}
            	</p>`;
        }


        private _state2CssClass( state: TestState ): string {
            if ( state === TestState.FAILURE_ASSERTION
                || state === TestState.FAILURE_EXCEPTION
                || state === TestState.TIMEOUT
                || state === TestState.KILLED )
                return 'error';
            else if ( state === TestState.SUCCESS )
                return 'success'
            else if ( state === TestState.WORKING )
                return 'working'
            else
                return 'new';
        }


        private _msPrettyPrint( milliseconds: number ): string {
            return ( Math.ceil( milliseconds / 10 ) / 100 ).toString() + 's';
        }


        private _messageFromState( testState: TestState, errorMsg: string ): string {
            if ( testState === TestState.FAILURE_EXCEPTION )
                return 'Error: ' + errorMsg || 'Unknown error!';
            else if ( testState === TestState.FAILURE_ASSERTION )
                return 'Assertion: ' + errorMsg || 'Unknown assertion message!';
            else if ( testState === TestState.TIMEOUT )
                return 'Error: ' + errorMsg || 'Unknown error!';
            else if ( testState === TestState.KILLED )
                return 'Killed by user!';
            else if ( testState === TestState.SUCCESS )
                return 'OK'
            else if ( testState === TestState.WORKING )
                return 'Testing...'
            else if ( testState === TestState.SKIPPED )
                return 'Skipped';
            else
                return 'Pending';
        }
    }
}