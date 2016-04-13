//"use strict";
//
//namespace HsLogic {
//
//    export class PermanentStateCalculator {
//
//        recalculate( permanent: Minion | Player | Weapon ): void {
//            if ( permanent instanceof Minion ) {
//                this.resetMinion( permanent );
//            }
//
//            this._recalculateFromScratch( permanent );
//        }
//
//        resetMinion( minion: Minion ): void {
//            minion.hp = minion.def.hp;
//            minion.attack = minion.def.hp;
//            minion.maxHp = minion.def.hp;
//        }
//
//        protected _recalculateFromScratch( permanent: Minion | Player | Weapon ): void {
//            //let states: PermanentStateChange<any>[] = permanent.s
//        }
//
//        //resetMinionHpAndAttack( minion: Minion ): void {
//        //    minion.hp = minion.def.hp;
//        //    minion.attack = minion.def.hp;
//        //    minion.maxHp = minion.def.hp;
//        //}
//    }
//}
//
