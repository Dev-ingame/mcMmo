import { Player, system, world } from "@minecraft/server";

/**
 * @param {Player} target
 * @param {String} rawtext
 */
export function sendNotifyActionbar(target = world, rawtext) {
    system.run(() => {
        world | target.onScreenDisplay.setActionBar(rawtext);
    });
}
