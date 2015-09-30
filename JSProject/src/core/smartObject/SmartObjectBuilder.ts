"use strict";

namespace smartObj {

    export type BuildSmartObjFn = () => SmartObject;
    interface IBuilderMap { [clazz: string]: BuildSmartObjFn }

    export class SmartObjectBuilder {

        private map: IBuilderMap = {};


        register(clazz: string, builder: BuildSmartObjFn) {
            this.validateClazz(clazz);
            this.validatePrototype(clazz, builder);

            this.map[clazz] = builder;
        }


        build(clazz: string): SmartObject {
            //return Object.create(this.getPrototype(clazz), {});
            return this.getPrototype(clazz).apply(this);
        }


        checkClazz(clazz: string): void {
            this.getPrototype(clazz);
        }


        private getPrototype(clazz: string): BuildSmartObjFn {
            this.validateClazz(clazz);

            let builder: BuildSmartObjFn = this.map[clazz] || null;
            if (builder === null)
                throw new Error(`No SmartObject "${clazz}" registered!`);

            return builder;
        }


        private validateClazz(clazz: string): void {
            if (clazz === '' || clazz === null || clazz === undefined)
                throw new Error(`Clazz can't be empty!`);
        }

        private validatePrototype(clazz: string, builder: BuildSmartObjFn): void {
            if ((builder || null) === null)
                throw new Error(`Prototype for clazz ${clazz} can't be empty!`);

            let cachedPrototype: BuildSmartObjFn = this.map[clazz] || null;
            if (cachedPrototype != null && cachedPrototype != builder)
                throw new Error(`Duplicated clazz name: "${clazz}"`);
        }
    }
}