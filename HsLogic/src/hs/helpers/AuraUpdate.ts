"use strict";

namespace HsLogic {


    export function auraUpdate( auraType: Def.AURA_TYPE, gameCtx: HsGameCtx ): ActionType[] {
        let actions: ActionType[] = [],
            targets: PermanentExt[];

        gameCtx.gameBoard.auras = gameCtx.gameBoard.auras.sort( Entity.compare );

        for ( let aura of gameCtx.gameBoard.auras ) {
            if ( aura.auraType === auraType ) {

                if ( isAuraAlive( aura, gameCtx ) )
                    rebuildAura( aura, gameCtx )

                else
                    removeAura( aura, gameCtx );

            }
        }

        return actions;
    }


    export function isAuraAlive( aura: Aura, gameCtx: HsGameCtx ): boolean {
        return true;
    }


    export function removeAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            target: PermanentExt;

        for ( let key in aura.state.managedEffects ) {
            target = aura.state.managedEffects[key].target;

            result = result.concat(
                prepareOperations( aura, target, {
                    target: target, tags: [], triggers: [], enchantments: []
                }, gameCtx ) );
        }

        return result;
    }


    export function rebuildAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            targets: PermanentExt[],
            refreshedEffets: Def.IAuraManagedEffects;

        targets = aura.targetBuilder( aura, gameCtx )
            .buildSet( aura.getSource(), gameCtx );

        for ( let target of targets ) {
            refreshedEffets = aura.effectBuilder( aura, target, gameCtx );
            updateOrderOfPlay( aura, refreshedEffets );
            result = result.concat( prepareOperations( aura, target, refreshedEffets, gameCtx ) );
        }

        return result;
    }


    export function prepareOperations( aura: Aura, target: PermanentExt, refreshedEffets: Def.IAuraManagedEffects, gameCtx: HsGameCtx ): ActionType[] {

        let effects: Def.IAuraManagedEffects = aura.state.managedEffects[target.id];

        return tagsOperations( aura.getSource(), target, effects.tags, refreshedEffets.tags, gameCtx )
            .concat( triggersOperations( aura.getSource(), effects.triggers, refreshedEffets.triggers, gameCtx ) )
            .concat( enchantmentsOperations( aura.getSource(), target, effects.enchantments, refreshedEffets.enchantments, gameCtx ) );

    }


    function tagsOperations( source: ISource, target: PermanentExt, oldTags: Tag[], newTags: Tag[], gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            delta: { old: Tag[], new: Tag[], amount: number },
            tagsDelta: Collection.IStringMap<{ old: Tag[], new: Tag[], amount: number }>;

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


    function triggersOperations( source: ISource, oldTriggers: Trigger[], newTriggers: Trigger[], gameCtx: HsGameCtx ): ActionType[] {
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


    function enchantmentsOperations( source: ISource, target: PermanentExt, oldEnchantments: Enchantment<PermanentExt>[], newEnchantments: Enchantment<PermanentExt>[], gameCtx: HsGameCtx ): ActionType[] {
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


    function updateOrderOfPlay( aura: Aura, refreshedEffets: Def.IAuraManagedEffects ): void {
        for ( let trigger of refreshedEffets.triggers )
            trigger.orderOfPlay = aura.orderOfPlay;

        for ( let enchantment of refreshedEffets.enchantments )
            enchantment.orderOfPlay = aura.orderOfPlay;
    }

}