import {Card} from '../card/Card';
import {Enchantment} from './Enchantment';

export class Tag {

    parent: Enchantment<Card>;
    orderOfPlay: number;

}

//     export class Tag {
//         get type(): string { return ClassUtils.getNameOfClass( this ) }
//         silencable: boolean = true;
//         copyable: boolean = true;

//         value: number = 0;

//         constructor( public source: HsLogic.ISource ) { }
//     }


//     export class Tags {
//         private tags: Tag[] = [];

//         add( tag: Tag ): void {
//             if ( !this.contains( tag ) )
//                 this.tags.push( tag );
//         }


//         contains( tagClass: TagClass ): boolean;
//         contains( tag: Tag ): boolean;
//         contains( x: any ): boolean {
//             if ( x instanceof Tag )
//                 return this.tags.indexOf( x ) >= 0;
//             else {
//                 for ( let tag of this.tags )
//                     if ( tag instanceof x )
//                         return true;

//                 return false;
//             }
//         }


//         hasAny( tagClasses: TagClass[] ): boolean {
//             for ( let tagClass of tagClasses )
//                 if ( this.contains( tagClass ) )
//                     return true;

//             return false;
//         }


//         remove( tag: Tag ): void {
//             Collection.removeFrom( this.tags, tag );
//         }


//         removeAll( tagClass: TagClass ): void {
//             for ( let i = this.tags.length - 1; i >= 0; i-- ) {
//                 if ( this.tags[i] instanceof tagClass )
//                     Collection.removeFrom( this.tags, i );
//             }
//         }


//         getOne( tagClass: TagClass ): Tag {
//             for ( let tag of this.tags )
//                 if ( tag instanceof tagClass )
//                     return tag;

//             return null;
//         }


//         getAll( tagClass: TagClass ): Tag[] {
//             let results: Tag[] = [];

//             for ( let tag of this.tags )
//                 if ( tag instanceof tagClass )
//                     results.push( tag );

//             return results;
//         }


//         getSourceOfOne( tagClass: TagClass ): ISource {
//             let result: Tag = this.getOne( tagClass );
//             return result !== null ? result.source : null;
//         }


//         count( tagClass: TagClass ): number {
//             return this.getAll( tagClass ).length;
//         }


//         countValues( tagClass: TagClass ): number {
//             let result: number = 0;
//             this.getAll( tagClass ).forEach(
//                 tag => result += tag.value
//             );
//             return result;
//         }
//     }

// }