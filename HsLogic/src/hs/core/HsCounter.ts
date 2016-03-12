///<reference path="../../core/Counter.ts"/>

"use strict";

namespace HSLogic {

    export class HsCounter extends jsLogic.Counter {

    }

    export class VoidCounter extends HsCounter {
        constructor() {
            super( 0 );
        }
    }


    export class FatigueCounter extends HsCounter {
        static get type(): string { return ( new FatigueCounter( null ) ).type; }
    }


    export class DivineShieldCounter extends VoidCounter {
        static get type(): string { return ( new DivineShieldCounter() ).type; }
    }

    //export class HpCounter extends HsCounter {
    //    static get type(): string { return (new HpCounter(0)).type; }
    //}

}