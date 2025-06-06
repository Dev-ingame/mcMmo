import { Container, Player, world } from "@minecraft/server";
import { sendNotifyActionbar } from "./utils";
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

world.afterEvents.entitySpawn.subscribe((event) => {
    console.warn("entity spawned");
});

world.afterEvents.itemUse.subscribe((event) => {
    const item = event.itemStack;
    const source = event.source;
    if (item.typeId === "minecraft:stick") {
        pstats.forEach((item) => {
            console.warn(db.get(source, item));
        });
    } else if (item.typeId === "minecraft:compass") {
        stat(source)
        // try {
        //     pstats.forEach((item) => {
        //         db.set(source, item, 0);
        //     });
        //     console.warn("database created for: " + source.name);
        // } catch (error) {
        //     console.warn(
        //         "an error occured while creating the database: " + error
        //     );
        // }
        // if (!db.has(target, "havepStat")) {

        // } else {
        //     console.warn(JSON.stringify(db.getAll(player)));
        // }
    }
});

//Mining
world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block = event.block;
    const player = event.player;

    const blocktype = block.typeId.toLowerCase().replace("minecraft:", "");
    console.warn(block.typeId);
    if (blocktype in miningXPTable) {
        console.warn(`score: ${miningXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Mining Point`);
    } else if (blocktype in woodcuttingXPTable) {
        console.warn(`score: ${woodcuttingXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Wood Cutting Point`);
    } else if (blocktype in excavationXPTable) {
        console.warn(`score: ${excavationXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Excavation Point`);
    } else if (blocktype in herbalismXPTable) {
        console.warn(`score: ${herbalismXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Herbalism Point`);
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
