import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { pstats } from "./xpTables";
import { getXPForLevel } from "./utils";
import { skillPassives } from "./passives";
import { Database } from "./data";

const db = new Database();

const skillList = pstats.filter(s => !s.includes("currentExp") && s !== "havepStat");

/**
 * 
 * @param {Player} target
 */
export function stat(target) {
    const form = new ActionFormData().title("Your Skill Stats");

    skillList.forEach(skill => {
        const level = db.get(target, skill) ?? 0;
        const xp = db.get(target, `${skill}currentExp`) ?? 0;
        const needed = getXPForLevel(level);
        form.button(`${capitalize(skill)} - Lv ${level} (${xp}/${needed})`);
    });

    form.button("Close");

    form.show(target).then(res => {
        const index = res.selection;
        if (index === undefined || index >= skillList.length) return;
        showSkillDetail(target, skillList[index]);
    }).catch(() => {});
}

/**
 * 
 * @param {Player} player
 * @param {string} skill
 */
function showSkillDetail(player, skill) {
    const level = db.get(player, skill) ?? 0;
    const xp = db.get(player, `${skill}currentExp`) ?? 0;
    const needed = getXPForLevel(level);

    const passives = skillPassives[skill] ?? [];

    const unlocked = passives
        .filter(p => level >= p.level)
        .map(p => `✔ [Lv ${p.level}] ${p.desc}`);

    const locked = passives
        .filter(p => level < p.level)
        .map(p => `✘ [Lv ${p.level}] ${p.desc}`);

    const body = [
        `Skill: ${capitalize(skill)}`,
        `Level: ${level}`,
        `XP: ${xp} / ${needed}`,
        "",
        "Unlocked Perks:",
        ...unlocked.length ? unlocked : ["(None)"],
        "",
        "Upcoming Perks:",
        ...locked.length ? locked : ["(None)"]
    ].join("\n");

    new ActionFormData()
        .title(`${capitalize(skill)} Details`)
        .body(body)
        .button("Back")
        .show(player)
        .then(() => stat(player))
        .catch(() => {});
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
