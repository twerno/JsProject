///<reference path="IRpcTask.ts"/>
///<reference path="../CommTypy.ts"/>

//class RpcTaskBuilder {
//    private map: IObjectMap = {};
//
//    register(name: string, prototype: Object) {
//        this.map[name] = prototype;
//    }
//
//    build(name: string): IRpcTask {
//        let prototype: Object = this.map[name] || null;
//        if (prototype === null)
//            throw new Error(`No RpcTask "${name}" registered!`);
//
//        return Object.create(prototype, { });
//    }
//}