module tsUnit {

    export class TestResultPainter {

        getHTML(result: TestResult): string {
            let template = '<article>' +
                '<h1>' + this.getTestResult(result) + '</h1>' +
                '<p>' + this.getTestSummary(result) + '</p>' +
                this.getLimitCleaner() +
                '<section id="tsFail">' +
                '<h2>Errors</h2>' +
                '<ul class="bad">' + this.getTestResultList(result.errors) + '</ul>' +
                '</section>' +
                '<section id="tsOkay">' +
                '<h2>Passing Tests</h2>' +
                '<ul class="good">' + this.getTestResultList(result.passes) + '</ul>' +
                '</section>' +
                `<section id="tsOkay">
                	<h2>SettingUp async</h2>
                	<ul class="good">${this.getAsyncTestState(result.asyncTestMap) }</ul>
                 </section>`
            '</article>' +
            this.getLimitCleaner();

            return template;
        }

        showResults(target: HTMLElement, result: TestResult): void {
            target.innerHTML = this.getHTML(result);
        }

        private getTestResult(result: TestResult) {
            return result.errors.length === 0 ? 'Test Passed' : 'Test Failed';
        }

        private getTestSummary(result: TestResult) {
            return 'Total tests: <span id="tsUnitTotalCout">' + (result.passes.length + result.errors.length).toString() + '</span>. ' +
                'Passed tests: <span id="tsUnitPassCount" class="good">' + result.passes.length + '</span>. ' +
                'Failed tests: <span id="tsUnitFailCount" class="bad">' + result.errors.length + '</span>.';
        }

        private getTestResultList(testResults: TestDescription[]) {
            var list = '';
            var group = '';
            var isFirst = true;
            for (var i = 0; i < testResults.length; ++i) {
                var result = testResults[i];
                if (result.testName !== group) {
                    group = result.testName;
                    if (isFirst) {
                        isFirst = false;
                    } else {
                        list += '</li></ul>';
                    }
                    list += '<li>' + this.getLimiterForGroup(group) + result.testName + '<ul>';
                }

                var resultClass = (result.message === 'OK') ? 'success' : 'error';
                var functionLabal = result.funcName + ((result.parameterSetNumber === null)
                    ? '()'
                    : '(' + this.getLimiterForTest(group, result.funcName, result.parameterSetNumber) + ' paramater set: ' + result.parameterSetNumber + ')');

                list += '<li class="' + resultClass + '">' + this.getLimiterForTest(group, result.funcName) + functionLabal + ': ' + this.encodeHtmlEntities(result.message) + '</li>';
            }
            return list + '</ul>';
        }

        private getAsyncTestState(stateMap: AsyncTestMap): string {
            let result: string = '';
            for (let key in stateMap) {
                result += `<li>${key}: ${}</li>`;
            }

            return result;
        }

        private getLimiterForGroup(groupName: string): string {
            return '&nbsp;<a href="#' + groupName + '" class="ascii">&#9658;</a>&nbsp;';
        }

        private getLimitCleaner(): string {
            return '<p><a href="#">Run all tests <span class="ascii">&#9658;</span></a></p>';
        }

        private getLimiterForTest(groupName: string, testName: string, parameterSet: number = null): string {
            if (parameterSet !== null) {
                testName += '(' + parameterSet + ')';
            }

            return '&nbsp;<a href="#' + groupName + '/' + testName + '\" class="ascii">&#9658;</a>&nbsp;';
        }

        private encodeHtmlEntities(input: string) {
            return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }


    export class TestResultLivePainter {

        private painter: TestResultPainter = new TestResultPainter();

        constructor(public target: HTMLElement, public testEngine: Test) {
            testEngine.onResultChange = this._repaint;
        }

        private _repaint(result: TestResult): void {
            this.painter.showResults(this.target, result);
        }
    }
}