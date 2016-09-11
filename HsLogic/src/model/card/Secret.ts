// /// <reference path="card.ts" />

// "use strict";

// namespace HsLogic {

//     export class Secret extends Card {
//         def: Def.ISecret;

//         static build( owner: Player, def: Def.ISecret ): Secret {
//             return new Secret( owner, def ).init();
//         }

//         init(): Secret {
//             super.init();
//             return this;
//         }

//         protected initFromDefinition( def: Def.ISecret ): void {
//             super.initFromDefinition( def );
//         }

//         getSourceType(): SOURCE_TYPE {
//             return SOURCE_TYPE.SPELL;
//         }
//     }

// }