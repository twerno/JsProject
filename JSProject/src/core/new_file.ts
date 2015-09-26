interface ComesFromString<T> {
    name: string;

    do(): T;
}

//interface StringConstructable {
//    new (n: string): ComesFromString;
//}

class MadeFromString implements ComesFromString<Object> {
    constructor(public name: string) {
        console.log('ctor invoked');
    }

    do<T>(): T {
        return null;
    }
}

//function makeObj(n: StringConstructable) {
//    return new n('hello!');
//}
//
//console.log(makeObj(MadeFromString).name);