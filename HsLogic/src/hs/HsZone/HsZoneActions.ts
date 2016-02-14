///<reference path="../../core/Action.ts"/>
///<reference path="../../core/Zone.ts"/>

"use strict";

namespace HSLogic {

    /**
     * PutGeneratedCardIntoHand
     *   Generated card: for example fireball ganerated by Archmage Antonidas or card copied by Chromaggus 
     *
     */
    export class PutGeneratedCardIntoHand<T> extends HsBaseAction<T> {

        protected baseActionResolver(param: T): void {
            if ( !this.hand.isFull )
                this.hand.addEntity( this.card );
            // nothing happens if the hand zone is full
        }

        constructor( public card: Card, public hand: HsZone) {
            super();
        };
    }


    /**
     * ReturnCardIntoHand
     *   return card from one of play's zone: minion, weapon, secret
     *
     */
    export class ReturnCardIntoHand<T> extends HsAction<T> {

        resolve( param: T): Promise<HsAction<T>[]> {
            return new Promise<jsLogic.IAction<T>[]>(
                ( resolve, reject ): void => {

                    if ( this.hand.isFull )
                    {
                        resolve( [new AddDestroyMark<T>( this.card )] );
                    }
                    else
                    {
                        this.sourceZone.removeEntity( this.card );
                        this.hand.addEntity( this.card );
                        resolve( null );
                    }
                });
        }

        constructor( public card: Card, public sourceZone: HsZone, public hand: HsZone) {
            super();
        };
    }


    //export class PutCardIntoHand<T> extends HsBaseAction<T> {

    //    protected baseActionResolver( param: T ): void {
    //        if ( !this.hand.isFull )
    //            this.hand.addEntity( this.card );
    //        // nothing happens if the hand zone is full
    //    }

    //    constructor( public card: Card, public hand: HsZone ) {
    //        super();
    //    };
    //}



    export class AddDestroyMark<T> extends HsAction<T> {

        resolve( gameModule: T ): Promise<HsAction<T>[]> {
            return new Promise<jsLogic.IAction<T>[]>(
                ( resolve, reject ): void => {

                    this.card.markers.put( new DestroyMarker() );

                    resolve( null );
                });
        }

        constructor( public card: Card ) {
            super();
        };
    }


    //export class DiscardCard<T> extends HsBaseAction<T> {
    //} 



    export class DrawACard<T> extends HsAction<T> {

        resolve(gameModule: T): Promise<HsAction<T>[]> {
            return new Promise<jsLogic.IAction<T>[]>(
                (resolve, reject): void => {
                    resolve(null);
                });
        }

        constructor(public card: Card, public handZone: HsZone) {
            super();
        };
    }

}