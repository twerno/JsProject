"use strict";
/*
// printDelayed is a 'Promise<void>'
/*async function printDelayed(elements: string[]): Promise<void> {
    for (const element of elements) {
        await delay(200);
        console.log(element);
    }
}

async function delay(milliseconds: number): Promise<string> {
    return new Promise<string>(resolve => {
        setTimeout(resolve, milliseconds);

    });
}

printDelayed(["Hello", "beautiful", "asynchronous", "world"])
    .then(() => {
        console.log();
        console.log("Printed every element!");
    })
    .then(() => { printDelayed(["Hello", "beautiful", "asynchronous", "world"]) })
    .catch((reason: any) => { console.log('log: ' + reason); });


class TestTask extends asyncUtils6.AsyncTask <void> {
    run(): void {
        console.log('log');
    }
}

Promise.all<string>(['a', 'b', 'c']);

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, "foo");
});*/

//Promise.all<string>([p1, p2, p3]).then(function(values) {
//    console.log(values); // [3, 1337, "foo"] 
//});
