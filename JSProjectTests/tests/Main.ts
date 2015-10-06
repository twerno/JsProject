///<reference path="smartObject/SmartObjectBasicTests.ts"/>
// <reference path="tsUnit/tsUnit.ts" />
	
window.onload = () => {

    // Instantiate tsUnit and pass in modules that contain tests
    var testEngine = new tsUnit.TestEngine(TestModule);
    var resultPainter = new tsUnit.TestResultLivePainter(document.getElementById('result'), testEngine);
    testEngine.run();
 
    // Show the test results
    //test.showResults(document.getElementById('result'), test.run());
}; 