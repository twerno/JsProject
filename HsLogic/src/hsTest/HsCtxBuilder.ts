///<reference path="TestCommons.ts"/>
///<reference path="TestGroupRunner.ts"/>

"use strict";

namespace HsTest {

    export enum PLAYER {
        FIRST, SECOND
    }

    export interface HsCtxPlayerBuilderParam {
        player: PLAYER,
        active: boolean,
        hand: ICard[],
        deck: ICard[]
    }

    export interface HsCtxBuilderParam {
        players: HsCtxPlayerBuilderParam[],
        battlefield: {
            card: { owner: PLAYER, weapon: IWeapon } | { owner: PLAYER, minion: IMinion, position: number }
        }[]
    }


    export class HsCtxBuilder {

        build( params: HsCtxBuilderParam ): void {
            let result: HsGameCtx = new HsLogic.HsGameCtx(),
                player: Player;

            for ( let p of params.players ) {
                player = this.buildPlayer( p );
                result.players.push( player );

                if ( p.active )
                    result.activePlayer = player;

                this.initDeckAndHandOf( player, p, result.gameBoard.zonesOf( player ) );
            }
        }

        protected buildPlayer( playerDef: HsCtxPlayerBuilderParam ): Player {
            let player: HsLogic.Player = new HsLogic.Player( playerDef.player === PLAYER.FIRST ? 'first' : 'second' );

            return player;
        }


        protected initDeckAndHandOf( player: Player, playerDef: HsCtxPlayerBuilderParam, zones: Zones ): void {
            for ( let cardDef of playerDef.hand ) {
                zones.hand.addEntity( this.buildCard( player, cardDef ) );
            }

            for ( let cardDef of playerDef.deck ) {
                zones.deck.addEntity( this.buildCard( player, cardDef ) );
            }
        }


        protected buildCard( owner: Player, def: ICard ): Card {
            if ( def.metadata.cardType === Def.CARD_TYPE.MINION )
                return new HsLogic.Minion( owner, def );

            if ( def.metadata.cardType === Def.CARD_TYPE.SPELL )
                return new HsLogic.Spell( owner, def );

            if ( def.metadata.cardType === Def.CARD_TYPE.WEAPON )
                return new HsLogic.Weapon( owner, def );

            throw new Error( `Unknown type: ${def.metadata.cardType} of card: ${def}.` );
        }

    }

}