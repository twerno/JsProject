/// <reference path="../enchantment.ts" />

"use strict";

namespace HsLogic {

    export class TagManagerEnchantment extends Enchantment<Permanent> {

        private _param: TagManagerEnchantmentParam;
        private tag: Tag = null;

        constructor( source: ISource, public targets: CharacterExt[], isAura: boolean = false ) {
            super( source, null, isAura );
        }


        protected validateTarget(): boolean {
            return this.target instanceof Minion
                || this.target instanceof Hero
                || this.target instanceof Weapon
                || this.target instanceof Player;
        }


        init( tagClass: TagClass, amount: number ): TagManagerEnchantment {
            this._param = {
                tagClass: tagClass || null,
                amount: Math.max( amount || 0, 0 )
            };
            this._paramValidator();

            return this;
        }


        apply(): void {
            this._paramValidator();
            if ( this.tag = null ) {
                this.tag = new this._param.tagClass( this.source );
                for ( let target of this.targets )
                    for ( let i = 0; i < this._param.amount; i++ )
                        this.target.tags.add( this.tag );
            }
        }

        remove(): void {
            for ( let target of this.targets )
                target.tags.remove( this.tag );
        }


        private _paramValidator(): void {
            if ( this._param.tagClass === null )
                throw new Error( 'Tag class is null.' );
            if ( this._param.amount === 0 )
                throw new Error( 'Tag amount is 0.' );
        }
    }


    interface TagManagerEnchantmentParam {
        tagClass: TagClass,
        amount: number
    }

}