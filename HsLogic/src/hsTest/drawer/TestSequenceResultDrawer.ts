/// <reference path="../testcommons.ts" />

"use strict";

namespace HsTest {

    export class TestSequenceResultDrawer {

        getHtml( result: TestSequenceResult ): string {
            let html: string = '<ul><li>';
            html += `<div class='${this.getHeaderStyle( result.state )}'>`
            html += this.testSequenceResultHead( result );

            html += `<ul><div id='${result.id}' class='collapse'>`;
            for ( let test of result.testResults ) {
                html += this.getTestHtml( test );
            }

            html += '</ul></div>';
            html += '</li></div></ul>';
            return html
        }



        testSequenceResultHead( result: TestSequenceResult ): string {
            let html: string = '';
            html += `<h3>`;
            html += `<button type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-target="#${result.id}">+</button> `;
            html += `${result.testTitle}</h3>`;
            html += result.error ? ': ' + result.error.message : '';
            return html;
        }


        getHeaderStyle( state: TestSequenceResultState ): string {
            if ( state === TestSequenceResultState.PASSED )
                return 'success';
            else
                return 'danger';
        }



        getTestHtml( result: TestResult ): string {
            let html: string = '',
                hasParams: boolean = ( result.param !== null && ( result.param.before !== null || result.param.after !== null ) ),
                chain: string[] = result.chain;
            html += `<li><div class=${this.getTestHeaderStyle( result.state )}><h4>`;
            html += `<button type="button" class="btn btn-default btn-xs" ${!hasParams ? 'disabled="disabled"' : ''} data-toggle="collapse" data-target="#${result.id}">+</button> `;

            if ( result.actionClass === ClassUtils.getNameOfClass( HsLogic.DispatchEvent ) )
                chain = result.chain.slice( 0, result.chain.length - 1 ).concat( 'Event: ' + result.eventClass );

            html += chain.join( ' >> ' );

            html += '</h4>';

            if ( hasParams )
                html += this.getParamHtml( result.id, result.param.before, result.param.after );

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



        getParamHtml( id: string, paramBefore: any, paramAfter: any ): string {
            let html: string = '',
                keys: string[] = this.deepMergeKeys( paramBefore, paramAfter ),
                val1: any,
                val2: any,
                style: string;

            html += `<div id='${id}' class='collapse'>`;
            html += `<table class='table' style='width:92%; margin-left:2%;'>`;
            html += '<thead><tr><th>Key</th><th>Before</th><th>After</th></tr></thead>';

            for ( let key of keys ) {
                val1 = this.deepKeyValue( key, paramBefore );
                val2 = this.deepKeyValue( key, paramAfter );
                style = val1 === val2 ? '' : 'danger';

                html += `<tr class='${style}'>`;
                html += `<td>${key}</td>`;
                html += `<td>${val1}</td>`;
                html += `<td>${val2}</td>`;

            }

            html += '</table></div>';
            return html;
        }


        protected deepMergeKeys( paramBefore: IAnyMap, paramAfter: IAnyMap ): string[] {
            let result: string[] = this.deepMineKeys( '', paramBefore );

            for ( let key of this.deepMineKeys( '', paramAfter ) )
                if ( result.indexOf( key ) === -1 )
                    result.push( key );

            return result;
        }

        protected deepMineKeys( masterKey: string, map: any ): string[] {
            let result: string[] = [],
                computedKey: string;

            if ( map && typeof ( map ) === 'object' )
                for ( let key of Object.keys( map ) ) {
                    computedKey = masterKey ? masterKey + '.' + key : key;
                    if ( typeof ( map ) !== 'object' )
                        result.push( computedKey );
                    result = result.concat( this.deepMineKeys( computedKey, map[key] ) );
                }
            else
                result.push( masterKey );
            return result;
        }

        protected deepKeyValue( deepKey: string, map: any ): any {
            let dotIdx: number = deepKey.indexOf( '.' );
            if ( dotIdx > -1 )
                return this.deepKeyValue( deepKey.substr( dotIdx + 1 ), map[deepKey.substr( 0, dotIdx )] );
            else
                return map[deepKey];
        }

    }
    export interface IAnyMap { [key: string]: any }

}