///<reference path="smartObject/SmartObjectBasicTests.ts"/>
///<reference path="tsUnit.ts" />
	
window.onload = () => {

    var testEngine = new tsUnit.TestEngine(TestModule);
    var resultPainter = new tsUnit.TestResultLivePainter(document.getElementById('result'), testEngine);
    testEngine.run();         
}; 