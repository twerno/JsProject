"use strict";

namespace Def {

    export type Entity = HsLogic.Entity;
    export type Card = HsLogic.Card;
    export type Minion = HsLogic.Minion;
    export type Player = HsLogic.Player;
    export type Character = HsLogic.Character;
    export type Weapon = HsLogic.Weapon;
    export type Permanent = HsLogic.Permanent;
    export type ISource = HsLogic.ISource;
    export type HsCancelableParam = HsLogic.IHsCancelableParam;
    export type HsGameCtx = HsLogic.HsGameCtx;
    export type IActionParam = HsLogic.IActionParam;
    export type ActionEvent = HsLogic.ActionEvent<IActionParam>;
    export type ActionEventClass = HsLogic.ActionEventClass;
    export type Trigger = HsLogic.Trigger;
    export type Action = jsAction.IAction<HsGameCtx>;
    export type Zones = HsLogic.Zones;
    export type Zone = HsLogic.Zone<Card>;
    export type Tag = HsLogic.Tag;
    export type TagClass = HsLogic.TagClass;
    export type Enchantment = HsLogic.Enchantment<HsLogic.Permanent>;

}