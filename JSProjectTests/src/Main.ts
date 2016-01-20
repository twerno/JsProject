///<reference path="smartObject/SmartObjectBasicTests.ts"/>
///<reference path="tsUnit.ts" />
	
window.onload = () => {
    var testEngine: testEC6.TestEngine = new testEC6.TestEngine();
    testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    testEngine.registerTestGroup('basic2', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);

    var resultPainter = new testEC6.LiveResultPainter(document.getElementById('result'));
    testEngine.run(resultPainter);
};

function resultUpdateHandler(result: testEC6.TestResult, updated: testEC6.TestGroupResult | testEC6.TestResult): void {
    console.log(updated);
}