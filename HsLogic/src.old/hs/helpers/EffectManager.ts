"use strict";

namespace HsLogic {

    export class EffectManager {
        private _managedEffects: Entity[];



    }




    export function tagsOperations( source: ISource, target: Card | Player, oldTags: Tag[], newTags: Tag[], gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            delta: { old: Tag[], new: Tag[], amount: number },
            tagsDelta: Collection.IStringMap<{ old: Tag[], new: Tag[], amount: number }> = {};

        for ( let tag of oldTags ) {
            delta = tagsDelta[ClassUtils.getNameOfClass( tag )];
            if ( !delta ) {
                delta = { old: [], new: [], amount: 0 };
                tagsDelta[ClassUtils.getNameOfClass( tag )] = delta;
            }

            delta.old.push( tag );
            delta.amount -= 1;

        }

        for ( let tag of newTags ) {
            delta = tagsDelta[ClassUtils.getNameOfClass( tag )];
            if ( !delta ) {
                delta = { old: [], new: [], amount: 0 };
                tagsDelta[ClassUtils.getNameOfClass( tag )] = delta;
            }

            delta.new.push( tag );
            delta.amount += 1;
        }


        for ( let key in tagsDelta ) {
            delta = tagsDelta[key];
            if ( delta.amount > 0 )
                for ( let i = 0; i < delta.amount; i++ )
                    result.push( gameCtx.techActionFactory.addTag( {
                        source: source, tag: delta.new[i], targets: [target]
                    }) );

            if ( delta.amount < 0 )
                for ( let i = 0; i < Math.abs( delta.amount ); i++ )
                    result.push( gameCtx.techActionFactory.removeTag( {
                        source: source, tag: delta.old[i], targets: [target]
                    }) );

        }

        return result;

    }


    export function triggersOperations( source: ISource, oldTriggers: Trigger[], newTriggers: Trigger[], gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            exists: boolean,
            equalIds: Collection.IStringMap<boolean> = {};

        for ( let oldTrigger of oldTriggers ) {
            exists = false;
            for ( let newTrigger of newTriggers )
                if ( oldTrigger.eq( newTrigger ) ) {
                    exists = true;
                    equalIds[newTrigger.id] = true;
                    break;
                }

            if ( !exists )
                result.push( gameCtx.techActionFactory.unregisterTrigger( {
                    source: source, trigger: oldTrigger
                }) );
        }


        for ( let newTrigger of newTriggers ) {
            if ( equalIds[newTrigger.id] )
                continue;

            result.push( gameCtx.techActionFactory.registerTrigger( {
                source: source, trigger: newTrigger
            }) );
        }

        return result;
    }


    export function enchantmentsOperations( source: ISource, oldEnchantments: Enchantment<PermanentExt>[], newEnchantments: Enchantment<PermanentExt>[], gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            exists: boolean,
            equalIds: Collection.IStringMap<boolean> = {};

        for ( let oldEnchant of oldEnchantments ) {
            exists = false;
            for ( let newEnchant of newEnchantments )
                if ( oldEnchant.eq( newEnchant ) ) {
                    exists = true;
                    equalIds[newEnchant.id] = true;
                    break;
                }

            if ( !exists )
                result.push( gameCtx.techActionFactory.detachEnchantment( {
                    source: source, enchantment: oldEnchant
                }) );
        }


        for ( let newEnchant of newEnchantments ) {
            if ( equalIds[newEnchant.id] )
                continue;

            result.push( gameCtx.techActionFactory.attachEnchantment( {
                source: source, enchantment: newEnchant
            }) );
        }

        return result;
    }

}