// import {Card, Minion} from '../model/card/Card';
// import {Enchant, ExtEffects} from '../model/mechanic/Enchantment';


// export abstract class Enrage<M extends Minion> extends Enchant<M> {
    
//     targets(_gameEnv: Object): Object[] {
//         return [this.attachedTo];
//     }

//     abstract enchantmentFor(target: Card, gameEnv: Object): Enchant<M>;

//     refreshEffects(_target: Card, _gameEnv: Object): ExtEffects<M> {
//         let enchants: Enchant<M>[] = this.childrenMap[this.attachedTo.id] || [];
        
//         if (enchants.length === 0) {

//         }
//     }
// }