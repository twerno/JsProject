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
                else if ( typeof ( value ) === 'string' )
                    return value
                else
                    return value;
            });
    }

    export function card2JSON( card: HsLogic.Card ): string {
        return `{id: ${card.id}, name: '${card.name}'}`;
    }

    export function player2JSON( player: HsLogic.Player ): string {
        return `{id: ${player.id}, name: '${player.name}'}`;
    }

    export function trigger2JSON( trigger: HsLogic.Trigger ): string {
        let eventStr: string = trigger.respondsTo.join( ',' );

        return `{event: '${trigger.respondsTo.join( ', ' )}', keyword: '${trigger.keyword}', parent: ${model2JSON( trigger.attachedTo )}}`;
    }

    export function actionChainStr( action: jsAction.IActionType ): string {
        return ( action.parent ? actionChainStr( action.parent ) + ' >> ' : '' ) + action.className;
    }

    export function actionChainStrExclude( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): string {
        if ( !action )
            return '';

        if ( excludedAction( action, excludes ) )
            return ( action.parent ? actionChainStrExclude( action.parent, excludes ) : '' );

        return ( action.parent ? actionChainStrExclude( action.parent, excludes ) + ' >> ' : '' ) + action.className;
    }

    export function excludedAction( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): boolean {
        for ( let exclude of excludes || [] ) {
            if ( action instanceof exclude )
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

    //export function ac
}