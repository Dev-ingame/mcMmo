import {
    Container,
    Player,
    ScriptEventSource,
    system,
    world,
    BlockPermutation,
    World,
} from "@minecraft/server";
import { drawXPBar, getXPForLevel, sendNotifyActionbar } from "./utils";
import { stat } from "./ui";
import {
    combatXPTable,
    excavationXPTable,
    fishingXPTable,
    herbalismXPTable,
    miningXPTable,
    mobXP,
    pstats,
    lumberjackXPTable,
} from "./xpTables";
import { Database } from "./data";
import { config } from "./config";

const db = new Database();

const skillHandlers = {
    gathering: {
        pickaxe: {
            skill: "mining",
            table: miningXPTable,
        },
        axe: {
            skill: "lumberjack",
            table: lumberjackXPTable,
        },
        shovel: {
            skill: "excavation",
            table: excavationXPTable,
        },
        hoe: {
            skill: "herbalism",
            table: herbalismXPTable,
        },
    },

    combat: {
        sword: { skill: "sword" },
        axe: { skill: "axe" },
        arrow: { skill: "bow" },
        undefined: { skill: "unarmed" },
    },
};

function handleSkillXP(player, skill, target, table) {
    const currentXP = db.get(player, `${skill}currentExp`) ?? 0;
    const level = db.get(player, skill) ?? 0;

    const gainedXP = table[target];
    if (typeof gainedXP !== "number") return;

    const newXP = currentXP + gainedXP;
    db.set(player, `${skill}currentExp`, newXP);

    if (newXP >= getXPForLevel(level)) {
        db.set(player, `${skill}currentExp`, 0);
        db.set(player, skill, level + 1);
        player.sendMessage(
            `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${level} => ${
                level + 1
            }`
        );
    }

    sendNotifyActionbar(
        player,
        drawXPBar(`${skill}\n`, newXP, getXPForLevel(level))
    );
}

function getCombatType(itemId, projectile) {
    if (projectile?.typeId === "minecraft:arrow") return "arrow";
    if (itemId?.includes("sword")) return "sword";
    if (itemId?.includes("axe")) return "axe";
    if (!itemId || itemId === "minecraft:air") return "undefined"; // unarmed
    return null;
}

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;

    console.warn(`${player.name}: spawned`);

    if (db.has(player, "havepStat")) return;
    pstats.forEach((element) => {
        db.set(player, element, 0);
    });
});

world.afterEvents.itemUse.subscribe((event) => {
    const item = event.itemStack;
    const source = event.source;
    if (item.typeId === "minecraft:compass") stat(source);

    if (!config.debug) return;
    if (item.typeId === "minecraft:stick") {
        let text = "";
        db.getAll(source).forEach((item) => {
            text += `${item}\n`;
        });
        source.sendMessage(text);
    }
    if (item.typeId === "minecraft:torch") {
        source.clearDynamicProperties();
        console.warn("player db cleared");
    } else if (item.typeId === "minecraft:blaze_rod") {
        try {
            pstats.forEach((item) => {
                db.set(source, item, 0);
            });
            console.warn("db.created");
        } catch (error) {
            console.warn(error);
        }
    }
});

//tf am  i doing
//Mining
world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block = event.block;
    const player = event.player;

    const blocktype = block?.typeId.replace("minecraft:", "");
    const container = player.getComponent("minecraft:inventory").container;
    if (!container) return;

    const itemhand = container.getItem(player.selectedSlotIndex);
    if (!itemhand) return;
    for (const tool in skillHandlers.gathering) {
        if (itemhand.typeId.includes(tool)) {
            const { skill, table, notifyOnly } = skillHandlers.gathering[tool];
            const gainedXP = table[blocktype];
            if (!gainedXP) return;

            if (notifyOnly) {
                sendNotifyActionbar(player, `+${gainedXP} ${skill} Exp`);
            } else {
                handleSkillXP(player, skill, blocktype, table);
            }
            break;
        }
    }
});

//combat
world.afterEvents.entityDie.subscribe((event) => {
    const source = event.damageSource;
    const targetEntity = event.deadEntity;
    const target = targetEntity?.typeId?.replace("minecraft:", "");
    if (!(source?.damagingEntity instanceof Player)) return;

    const player = source.damagingEntity;
    const container = player.getComponent("minecraft:inventory")?.container;
    if (!container) return;

    const itemhand = container.getItem(player.selectedSlotIndex);
    const combatKey = getCombatType(
        itemhand?.typeId,
        source.damagingProjectile
    );
    const skillType = skillHandlers.combat[combatKey]?.skill;

    if (!skillType || !target) return;

    const baseXP = combatXPTable[`kill_${skillType}`] ?? 0;
    const mobBonus = mobXP[target] ?? 0;
    const totalXP = baseXP + mobBonus;

    if (totalXP > 0) {
        handleSkillXP(player, skillType, target, { [target]: totalXP });
    }
});

world.afterEvents.entityHurt.subscribe((event) => {
    const source = event.damageSource;
    const target = event.hurtEntity;
    const targetType = target?.typeId?.replace("minecraft:", "");
    if (!(source?.damagingEntity instanceof Player)) return;

    const player = source.damagingEntity;
    const container = player.getComponent("minecraft:inventory")?.container;
    if (!container) return;

    const itemhand = container.getItem(player.selectedSlotIndex);
    const combatKey = getCombatType(
        itemhand?.typeId,
        source.damagingProjectile
    );
    const skillType = skillHandlers.combat[combatKey]?.skill;

    if (!skillType || !targetType) return;

    const baseXP = combatXPTable[`hit_${skillType}`] ?? 0;
    const mobBonus = mobXP[targetType] ? Math.floor(mobXP[targetType] / 3) : 0;
    const totalXP = baseXP + mobBonus;

    if (totalXP > 0) {
        handleSkillXP(player, skillType, targetType, { [targetType]: totalXP });
    }
});


// Hook into Script Event
system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, sourceBlock, sourceEntity } = event;

    // abilities 
    // need to rewrite some stuff to make it work :)
});
