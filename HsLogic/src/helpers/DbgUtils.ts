"use strict";

namespace DbgUtils {

    export function model2JSON( model: Object ): any {
        return JSON.stringify( model,
            ( key, value ): any => {
                if ( value instanceof HsLogic.Card )
                    return card2JSON( value );
                else if ( value instanceof HsLogic.Player )
                    return player2JSON( value );
                else if ( value instanceof HsLogic.Trigger )
                    return trigger2JSON( value );
                else if ( value instanceof jsAction.Entity )
                    return `[${ClassUtils.getNameOfClass( value )}:${value.id}]`;
                else if ( value instanceof HsLogic.Tag )
                    return ClassUtils.getNameOfClass( value )
                else
                    return value;
            });
    }

    export function card2JSON( card: HsLogic.Card ): string {
        return `${ClassUtils.getNameOfClass( card )}[${card.id}, ${card.orderOfPlay}]: '${card.name}'`;
    }

    export function player2JSON( player: HsLogic.Player ): string {
        return `${ClassUtils.getNameOfClass( player )}[${player.id}]: '${player.name}'`;
    }

    export function trigger2JSON( trigger: HsLogic.Trigger ): string {
        return `${ClassUtils.getNameOfClass( trigger )}[${trigger.keyword}, ${trigger.orderOfPlay}]; attached_to: ${model2JSON( trigger.attachedTo )}`;
    }

    export function actionChainStr( action: jsAction.IActionType ): string {
        return ( action.parent ? actionChainStr( action.parent ) + ' >> ' : '' ) + action.className;
    }

    export function actionChainStr2( action: jsAction.IActionType ): string[] {
        return ( action.parent ? actionChainStr2( action.parent ) : [] ).concat( action.className );
    }

    export function actionChainStr3( action: jsAction.IActionType, actionNameBuilder: ( action: jsAction.IActionType ) => string ): string[] {
        return ( action.parent ? actionChainStr3( action.parent, actionNameBuilder ) : [] ).concat( actionNameBuilder( action ) );
    }

    export function actionChainStrExclude( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): string {
        if ( !action )
            return '';

        if ( excludedAction( action, excludes ) )
            return ( action.parent ? actionChainStrExclude( action.parent, excludes ) : '' );

        return ( action.parent ? actionChainStrExclude( action.parent, excludes ) + ' >> ' : '' ) + action.className;
    }

    export function actionChainStrExclude2( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): string[] {
        if ( !action )
            return [];

        if ( excludedAction( action, excludes ) )
            return ( action.parent ? actionChainStrExclude2( action.parent, excludes ) : [] );

        if ( action.parent )
            return actionChainStrExclude2( action.parent, excludes ).concat( action.className );
        else
            return [action.className];
    }

    export function excludedAction( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): boolean {
        for ( let exclude of excludes || [] ) {
            if ( action instanceof exclude )
                return true;
        }
        return false;
    }

    export function excludedActionStr( actionClassStr: string, excludes: jsAction.IActionClass[] ): boolean {
        for ( let exclude of excludes || [] ) {
            if ( ClassUtils.getNameOfClass( exclude ) === actionClassStr )
                return true;
        }
        return false;
    }


    export function testTitle( actions: jsAction.IActionType[] ): string {
        let result: string[] = [],
            title: string;

        for ( let action of actions ) {
            title = ClassUtils.getNameOfClass( action );
            if ( action instanceof HsLogic.Action
                && HsLogic.isActionParam( action.param )
                && action.param.source.entity instanceof HsLogic.Card )
                title += ': ' + action.param.source.entity.name;
            result.push( title );
        }
        return '[' + result.join( ' ,' ) + ']';
    }


    export function excludeFromChain( origin: string[], excludes: jsAction.IActionClass[] ): string[] {
        let result: string[] = [];
        for ( let actionClassStr of origin ) {
            if ( !excludedActionStr( actionClassStr, excludes ) )
                result.push( actionClassStr );
        }
        return result;
    }


    export function dbgActionTitle( action: jsAction.IActionType ): string {
        let prefix: string = '';
        if ( action instanceof HsLogic.Action && action.param && action.param.source.entity instanceof HsLogic.Trigger )
            prefix = `[${action.param.source.entity.keyword}] `;

        if ( action instanceof HsLogic.DispatchEvent )
            return prefix + `Event: (${ClassUtils.getNameOfClass( action.event )})`
        else if ( action instanceof HsLogic.AddTag || action instanceof HsLogic.RemoveTag )
            return prefix + `${action.className} (${ClassUtils.getNameOfClass( action.param.tag )} -> ${action.param.targets.join( ', ' )})`
        else if ( action instanceof HsLogic.AttachEnchantment || action instanceof HsLogic.DetachEnchantment )
            return prefix + `${action.className} (${action.param.enchantment.type} -> ${action.param.targets.join( ', ' )})`
        else
            return prefix + action.className
    }

}