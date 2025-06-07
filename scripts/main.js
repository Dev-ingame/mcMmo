import { Container, Player, world } from "@minecraft/server";
import { drawXPBar, getXPForLevel, sendNotifyActionbar } from "./utils";
import { stat } from "./ui";
import {
    excavationXPTable,
    fishingXPTable,
    herbalismXPTable,
    miningXPTable,
    mobXP,
    pstats,
    woodcuttingXPTable,
} from "./xpTables";
import { Database } from "./data";

const db = new Database();

const skillHandlers = {
    pickaxe: {
        skill: "mining",
        table: miningXPTable,
    },
    axe: {
        skill: "woodcutting",
        table: woodcuttingXPTable,
    },
    shovel: {
        skill: "excavation",
        table: excavationXPTable,
    },
    hoe: {
        skill: "herbalism",
        table: herbalismXPTable,
    },
};

function handleSkillXP(player, skill, blocktype, table, toolXPKey) {
    const currentXP = db.get(player, `${skill}currentExp`);
    const level = db.get(player, skill);

    const gainedXP = table[blocktype];
    if (!gainedXP) return;

    db.set(player, `${skill}currentExp`, currentXP + gainedXP);

    if (currentXP >= getXPForLevel(level)) {
        db.set(player, `${skill}currentExp`, 0);
        db.set(player, skill, level + 1);
        player.sendMessage(
            `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${level} => ${
                level + 1
            }`
        );
    }

    sendNotifyActionbar(player, drawXPBar(currentXP, getXPForLevel(level)));
}

// world.afterEvents.entitySpawn.subscribe((event) => {
//     console.warn("entity spawned");
// });

world.afterEvents.itemUse.subscribe((event) => {
    const item = event.itemStack;
    const source = event.source;
    if (item.typeId === "minecraft:stick") {
        pstats.forEach((item) => {
            console.warn(db.get(source, item));
        });
    } else if (item.typeId === "minecraft:blaze_rod") {
        try {
            pstats.forEach((item) => {
                db.set(source, item, 0);
            });
            console.warn("db.created");
        } catch (error) {
            console.warn(error);
        }
    } else if (item.typeId === "minecraft:compass") {
        stat(source);
        // sendNotifyActionbar(source, `${getXPForLevel(1)}`)
        // for (let i = 0; i < 100; i++) {
        //     source.sendMessage(`${getXPForLevel(i)}`);
        // }
    }
});

//tf am  i doing
//Mining
world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block = event.block;
    const player = event.player;

    const blocktype = block.typeId.toLowerCase().replace("minecraft:", "");

    /**
     * @type Container
     */
    const container = player.getComponent("minecraft:inventory").container;
    const itemhand = container.getItem(player.selectedSlotIndex);

    if (!itemhand) return;
    for (const tool in skillHandlers) {
        if (itemhand.typeId.includes(tool)) {
            const { skill, table, notifyOnly } = skillHandlers[tool];
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
    const target = event.deadEntity.typeId.replace("minecraft:", "");
    if (source.damagingEntity instanceof Player) {
        const player = source.damagingEntity;
        const player2 = event.deadEntity;
        /**
         * @type Container
         */
        const container = player.getComponent("minecraft:inventory").container;
        const itemhand = container.getItem(player.selectedSlotIndex);

        if (target in mobXP) {
            console.warn(`score: ${mobXP[target]}`);
            sendNotifyActionbar(player, `+1 Combat Point`);
        }

        if (!source.damagingProjectile || !itemhand) return;
        if (!(player2 instanceof Player)) return;

        if (source.damagingProjectile.typeId === "minecraft:arrow") {
            console.warn("killed by arrow");
        } else if (itemhand.typeId.includes("sword")) {
            console.warn("killed by sword");
        } else if (itemhand.typeId.includes("axe")) {
            console.warn("killed by axe");
        } else {
            console.warn("killed by item");
        }
    }
});

world.afterEvents.entityHurt.subscribe((event) => {
    const source = event.damageSource;
    const target = event.hurtEntity;

    if (source.damagingEntity instanceof Player) {
        const player = source.damagingEntity;
        const player2 = event.deadEntity;
        /**
         * @type Container
         */
        const container = player.getComponent("minecraft:inventory").container;
        const itemhand = container.getItem(player.selectedSlotIndex);

        if (!source.damagingProjectile || !itemhand) return;
        if (!(player2 instanceof Player)) return;

        if (source.damagingProjectile.typeId === "minecraft:arrow") {
            console.warn("hit by arrow");
        } else if (itemhand.typeId.includes("sword")) {
            console.warn("hit by sword");
        } else if (itemhand.typeId.includes("axe")) {
            console.warn("hit by axe");
        } else {
            console.warn("hit by item");
        }
    }
});
