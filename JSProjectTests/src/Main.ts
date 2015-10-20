///<reference path="smartObject/SmartObjectBasicTests.ts"/>
///<reference path="tsUnit.ts" />
	
window.onload = () => {
    var testEngine: testEC6.TestEngine = new testEC6.TestEngine();
    testEngine.registerTestGroup('basic', null, BasicTest);

    var resultPainter = new testEC6.LiveResultPainter(document.getElementById('result'));
    testEngine.runTests(resultPainter);
};

function resultUpdateHandler(result: testEC6.Result, updated: testEC6.GroupResult | testEC6.TestResult): void {
    console.log(updated);
}