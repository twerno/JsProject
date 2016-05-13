/// <reference path="../core/actionevent.ts" />

"use strict";

namespace HsLogic.event {

    export class ProposedAttackEvent<P extends CombatParam> extends ActionEvent<P> { }

    export class AttackEvent<P extends CombatParam> extends ActionEvent<P> { }

    export class AfterAttackEvent<P extends CombatParam> extends ActionEvent<P> { }

}