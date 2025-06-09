import { Player, system, world } from "@minecraft/server";

/**
 * @param {Player} target
 * @param {String} rawtext
 */
function sendNotifyActionbar(target = world, rawtext) {
    system.run(() => {
        target.onScreenDisplay.setActionBar(rawtext);
    });
}

function getXPForLevel(level) {
    return Math.floor(120 + 20 * level + 10 * level ** 1.5);
}

function drawXPBar(prefix = "", currentXP, requiredXP, width = 20, suffix ='') {
    const percent = Math.min(currentXP / requiredXP, 1);
    const filled = Math.round(percent * width);
    const bar = "§a█§r".repeat(filled) + "░".repeat(width - filled);
    const pct = Math.round(percent * 100);
    return `${prefix}[${bar}] ${pct}%${suffix}`;
}

export { sendNotifyActionbar, getXPForLevel, drawXPBar };
