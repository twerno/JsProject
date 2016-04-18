/// <reference path="../enchantment.ts" />

"use strict";

namespace HsLogic {

    export class TagManagerEnchantment extends Enchantment<Permanent> {

        private _param: TagManagerEnchantmentParam;
        private registeredTags: Tag[] = [];

        constructor( source: ISource, target: Character, isAura: boolean = false ) {
            super( source, target, isAura );

            this.type = Def.AURA_TYPE.OTHER;
        }


        protected validateTarget(): boolean {
            return this.target instanceof Minion
                || this.target instanceof Hero
                || this.target instanceof Weapon;
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
            let tag: Tag;
            this._paramValidator();
            if ( this.registeredTags.length === 0 ) {
                for ( let i = 0; i < this._param.amount; i++ ) {
                    tag = new this._param.tagClass( this.source );
                    this.registeredTags.push( tag );
                    this.target.tags.add( tag );
                }
            }
        }

        replaceOfRemove(): AttackHealthEnchantment {
            for ( let tag of this.registeredTags ) {
                this.target.tags.remove( tag );
            }

            return null;
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