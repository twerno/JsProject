"use strict";

namespace Def {

    export type Entity = HsLogic.Entity;
    export type Card = HsLogic.Card;
    export type Hero = HsLogic.Hero;
    export type Spell = HsLogic.Spell;
    export type Minion = HsLogic.Minion;
    export type Weapon = HsLogic.Weapon;
    export type Secret = HsLogic.Secret;


    export type Player = HsLogic.Player;
    export type Character = HsLogic.Character;
    export type Permanent = HsLogic.Permanent;
    export type CharacterExt = HsLogic.CharacterExt;
    export type PermanentExt = HsLogic.PermanentExt;



    export type Tag = HsLogic.Tag;
    export type Aura = HsLogic.Aura;
    export type TagClass = HsLogic.TagClass;
    export type Trigger = HsLogic.Trigger;
    export type Enchantment = HsLogic.Enchantment<HsLogic.PermanentExt>;




    export type ISource = HsLogic.ISource;
    export type IActionParam = HsLogic.IActionParam;
    export type HsCancelableParam = HsLogic.IHsCancelableParam;
    export type HsGameCtx = HsLogic.HsGameCtx;
    export type Action = jsAction.IAction<HsGameCtx>;
    export type ActionEvent = HsLogic.ActionEvent<IActionParam>;
    export type ActionEventClass = HsLogic.ActionEventClass;


    export type Zone = HsLogic.Zone<Card>;
    export type Zones = HsLogic.Zones;

}