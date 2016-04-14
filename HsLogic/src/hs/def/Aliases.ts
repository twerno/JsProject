"use strict";

namespace Def {

    export type Entity = HsLogic.HsEntity;
    export type Card = HsLogic.Card;
    export type Minion = HsLogic.Minion;
    export type Player = HsLogic.Player;
    export type Character = HsLogic.Character;
    export type Weapon = HsLogic.Weapon;
    export type Target = Character | Weapon;
    export type ISource = HsLogic.ISource;
    export type HsCancelableParam = HsLogic.IHsCancelableParam;
    export type HsGameCtx = HsLogic.HsGameCtx;
    export type IActionParam = HsLogic.IActionParam;
    export type ActionEvent = HsLogic.ActionEvent<IActionParam>;
    export type ActionEventClass = HsLogic.ActionEventClass;
    export type Trigger = HsLogic.Trigger;
    export type Action = jsLogic.IAction<HsGameCtx>;
    export type HsZones = HsLogic.HsZones;
    export type HsZone = HsLogic.HsZone<Card>;
    export type Tag = HsLogic.Tag;
    export type TagClass = HsLogic.TagClass;
    export type Enchantment = HsLogic.Enchantment<HsLogic.Permanent>;

}