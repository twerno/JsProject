///<reference path="../../JSProjectECMA6/dist/jsProject6.d.ts"/>


window.onload = () => {
    var testEngine: testEC6.TestEngine = new testEC6.TestEngine();
    //    testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //    //testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //    testEngine.registerTestGroup('basic2', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //
    var resultPainter = new testEC6.LiveResultPainter( document.getElementById( 'result' ) );
    testEngine.run( resultPainter );
};