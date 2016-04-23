/// <reference path="../testcommons.ts" />

"use strict";

namespace HsTest {

    export class TestSequenceResultDrawer {

        getHtml( result: TestSequenceResult ): string {
            let html: string = '';
            html += `<div class='${this.getHeaderStyle( result.state )}'>`
            html += this.testSequenceResultHead( result );

            html += '<ul>';
            for ( let test of result.testResults ) {
                html += this.getTestHtml( test );
            }

            html += '</ul></div>'
            return html
        }



        testSequenceResultHead( result: TestSequenceResult ): string {
            return result.testClass + ( result.error ? ': ' + result.error.message : '' );
        }



        getHeaderStyle( state: TestSequenceResultState ): string {
            if ( state === TestSequenceResultState.PASSED )
                return 'success';
            else
                return 'danger';
        }



        getTestHtml( result: TestResult ): string {
            let html: string = '';
            html += `<li><div class=${this.getTestHeaderStyle( result.state )}>`;
            html += result.chain;

            html += '<table><tr><td>'
            if ( result.param && result.param.before )
                html += this.getParamHtml( result.param.before );
            html += '</td><td>';
            if ( result.param && result.param.after )
                html += this.getParamHtml( result.param.after );
            html += '</td></tr></table>';

            html += '</div></li>';
            return html;
        }



        getTestHeaderStyle( state: TestResultState ): string {
            if ( state === TestResultState.PASSED )
                return 'success';
            else if ( state in [TestResultState.NOT_RESOLVABLE, TestResultState.UNTESTED] )
                return 'active'
            else if ( state === TestResultState.RESOLVING )
                return 'info'
            else
                return 'danger';
        }



        getParamHtml( param: IAnyMap ): string {
            let html: string = '<ul>';

            for ( let key in param ) {
                html += '<li>' + key + ': ';
                if ( typeof ( param[key] ) === 'object' )
                    html += this.getParamHtml( param[key] );
                else
                    html += JSON.stringify( param[key] );
                html += '</li>';
            }

            html += '</ul>';
            return html;
        }

    }
    export interface IAnyMap { [key: string]: any }

}