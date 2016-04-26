/// <reference path="../testcommons.ts" />

"use strict";

namespace HsTest {

    export class TestSequenceResultDrawer {

        getHtml(result: TestSequenceResult): string {
            let html: string = '<ul><li>';
            html += this.testSequenceResultHead(result);

            html += `<ul><div id='${result.id}' class='collapse'>`;
            for (let test of result.testResults) {
                if (!DbgUtils.excludedActionStr(test.actionClass, result.consequencesMonitorExcludes))
                    html += this.getTestHtml(test, result);
            }

            html += '</ul></div>';
            html += '</li></ul>';
            return html
        }



        testSequenceResultHead(result: TestSequenceResult): string {
            let html: string = '';
            html += `<h3 class='${this.getHeaderStyle(result.state) }'>`;
            html += `<button type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-target="#${result.id}">+</button> `;
            html += `${result.testTitle}</h3>`;
            html += result.error ? ': ' + result.error.message : '';
            return html;
        }


        getHeaderStyle(state: TestSequenceResultState): string {
            if (state === TestSequenceResultState.PASSED)
                return 'text-success';
            else
                return 'text-danger';
        }



        getTestHtml(result: ActionTestResult, testSeq: TestSequenceResult): string {
            let html: string = '',
                hasParams: boolean = (result.param !== null && (result.param.before !== null || result.param.after !== null));

            html += `<li><h4 class=${this.getTestHeaderStyle(result.state) }>`;
            html += `<button type="button" class="btn btn-default btn-xs" ${!hasParams ? 'disabled="disabled"' : ''} data-toggle="collapse" data-target="#${result.id}">+</button> `;
            html += DbgUtils.excludeFromChain(result.chain, testSeq.consequencesMonitorExcludes).join(' >> ');

            html += '</h4>';

            if (hasParams)
                html += this.getParamHtml(result.id, result.param.before, result.param.after);

            html += '</li>';
            return html;
        }



        getTestHeaderStyle(state: TestResultState): string {
            if (state === TestResultState.PASSED)
                return 'text-success';
            else if (state in [TestResultState.NOT_RESOLVABLE, TestResultState.UNTESTED])
                return 'text-active'
            else if (state === TestResultState.RESOLVING)
                return 'text-info'
            else if (state === TestResultState.UNTESTED)
                return ''
            else
                return 'text-danger';
        }



        getParamHtml(id: string, paramBefore: any, paramAfter: any): string {
            let html: string = '',
                keys: string[] = this.deepMergeKeys(paramBefore, paramAfter),
                val1: any,
                val2: any,
                style: string;

            html += `<div id='${id}' class='collapse'>`;
            html += `<table class='table' style='width:92%; margin-left:2%;'>`;
            html += `<thead><tr><th style='width: 30%;'>Key</th><th style='width: 35%;'>Before</th><th style='width: 35%;'>After</th></tr></thead>`;

            for (let key of keys) {
                val1 = this.deepKeyValue(key, paramBefore);
                val2 = this.deepKeyValue(key, paramAfter);
                style = val1 === val2 ? '' : 'danger';

                html += `<tr class='${style}'>`;
                html += `<td>${key}</td>`;
                html += `<td>${val1}</td>`;
                html += `<td>${val2}</td>`;

            }

            html += '</table></div>';
            return html;
        }


        protected deepMergeKeys(paramBefore: any, paramAfter: any): string[] {
            let result: string[] = this.deepMineKeys('', paramBefore);

            for (let key of this.deepMineKeys('', paramAfter))
                if (result.indexOf(key) === -1)
                    result.push(key);

            return result;
        }

        protected deepMineKeys(masterKey: string, map: any): string[] {
            let result: string[] = [],
                computedKey: string;

            if (map && typeof (map) === 'object'
                && !(map instanceof Array && map.length === 0)) {

                let keys: string[] = Object.keys(map);
                if (keys.length > 0) {
                    for (let key of keys) {
                        computedKey = masterKey ? masterKey + '.' + key : key;
                        if (typeof (map) !== 'object')
                            result.push(computedKey);
                        result = result.concat(this.deepMineKeys(computedKey, map[key]));
                    }

                    return result;
                }

            }

            return [masterKey];
        }

        protected deepKeyValue(deepKey: string, map: any): any {
            let dotIdx: number = deepKey.indexOf('.'),
                result: any;

            if (dotIdx > -1)
                return this.deepKeyValue(deepKey.substr(dotIdx + 1), map[deepKey.substr(0, dotIdx)]);
            else {
                result = map[deepKey];
                if (result instanceof Array && result.length === 0)
                    return '[ ]';
                else
                    return result;
            }
        }

    }

}