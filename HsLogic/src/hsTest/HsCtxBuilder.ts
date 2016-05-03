"use strict";

namespace HsTest {

    export enum PLAYER {
        FIRST, SECOND
    }

    export interface HsCtxPlayerBuilderParam {
        player: PLAYER,
        active?: boolean,
        hero: Def.IHero,
        hand?: ICard[],
        deck?: ICard[]
    }

    export interface IBattlefieldWeapon {
        owner: PLAYER,
        weapon: IWeapon
    }

    function isBattlefieldWeapon( x: any ): x is IBattlefieldWeapon {
        return x.hasOwnProperty( 'owner' )
            && x.hasOwnProperty( 'weapon' );
    }

    export interface IBattlefieldMinion {
        owner: PLAYER,
        minion: IMinion,
        position?: number
    }

    function isBattlefieldMinion( x: any ): x is IBattlefieldMinion {
        return x.hasOwnProperty( 'owner' )
            && x.hasOwnProperty( 'minion' );
    }

    export interface HsCtxBuilderParam {
        players: HsCtxPlayerBuilderParam[],
        battlefield: ( IBattlefieldWeapon | IBattlefieldMinion )[],
        customInit?: ( hsGameCtx: HsGameCtx ) => void;
    }


    export class HsCtxBuilder {

        static build( param: HsCtxBuilderParam ): HsLogic.HsGameCtx {
            let builder: HsCtxBuilder = new HsCtxBuilder( param );
            return builder.build();
        }

        constructor( public param: HsCtxBuilderParam ) { }


        build(): HsLogic.HsGameCtx {
            let result: HsGameCtx = new HsLogic.HsGameCtx();

            this.buildPlayers( result, this.param.players );
            this.buildBattlefield( result, this.param.battlefield );


            if ( this.param.customInit )
                this.param.customInit( result );

            return result;
        }


        protected buildBattlefield( result: HsGameCtx, battlefieldDefs: ( IBattlefieldWeapon | IBattlefieldMinion )[] ): void {
            let player: Player,
                zones: Zones;

            for ( let c of battlefieldDefs ) {
                player = this.getPlayer( c.owner, result );
                zones = result.gameBoard.zonesOf( player );

                if ( isBattlefieldMinion( c ) ) {
                    let minion: Card = this.buildCard( player, ( <IBattlefieldMinion>c ).minion );
                    zones.battlefield.addEntity( minion, ( <IBattlefieldMinion>c ).position );
                    this.registerAuras( <HsLogic.Minion>minion, result );
                }

                else if ( isBattlefieldWeapon( c ) ) {
                    let weapon: Card = this.buildCard( player, ( <IBattlefieldWeapon>c ).weapon );
                    zones.weapon.addEntity( <HsLogic.Weapon>weapon );
                    this.registerAuras( <HsLogic.Weapon>weapon, result );
                }
            }
        }


        protected buildPlayers( result: HsGameCtx, playerDefs: HsCtxPlayerBuilderParam[] ): void {
            let player: Player;

            for ( let p of playerDefs ) {
                player = this.buildPlayer( p );
                player.hero = HsLogic.Hero.build( player, p.hero );
                result.registerPlayer( player );

                if ( p.active )
                    result.activePlayer = player;

                this.initDeckAndHandOf( player, p, result.gameBoard.zonesOf( player ) );
            }


            if ( result.players.length !== 2 )
                throw new Error( `Define 2 players` );


            if ( !result.activePlayer )
                result.activePlayer = result.players[0];
        }


        protected buildPlayer( playerDef: HsCtxPlayerBuilderParam ): Player {
            let player: HsLogic.Player = new HsLogic.Player( playerDef.player === PLAYER.FIRST ? 'first' : 'second' );

            return player;
        }


        protected initDeckAndHandOf( player: Player, playerDef: HsCtxPlayerBuilderParam, zones: Zones ): void {
            for ( let cardDef of ( playerDef.hand || [] ) ) {
                zones.hand.addEntity( this.buildCard( player, cardDef ) );
            }

            for ( let cardDef of ( playerDef.deck || [] ) ) {
                zones.deck.addEntity( this.buildCard( player, cardDef ) );
            }
        }


        protected buildCard( owner: Player, def: ICard ): Card {
            if ( def.metadata.cardType === Def.CARD_TYPE.MINION )
                return HsLogic.Minion.build( owner, <Def.IMinion>def );

            if ( def.metadata.cardType === Def.CARD_TYPE.SPELL )
                return HsLogic.Spell.build( owner, <Def.ISpell>def );

            if ( def.metadata.cardType === Def.CARD_TYPE.WEAPON )
                return HsLogic.Weapon.build( owner, <Def.IWeapon>def );

            throw new Error( `Unknown type: ${def.metadata.cardType} of card: ${def}.` );
        }


        protected getPlayer( playerType: PLAYER, hsGameCtx: HsGameCtx ): Player {
            if ( playerType === PLAYER.FIRST )
                return hsGameCtx.activePlayer;
            else for ( let p of hsGameCtx.players )
                if ( p !== hsGameCtx.activePlayer )
                    return p;
            return null;
        }

        protected registerAuras( auraSource: HsLogic.Permanent, gameCtx: HsLogic.HsGameCtx ): void {
            for ( let aura of auraSource.auras )
                gameCtx.gameBoard.auras.push( aura );
        }

    }

}