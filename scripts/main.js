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

    const miningcurrentxp = db.get(player, "miningcurrentExp");
    const mininglvl = db.get(player, "mining");

    /**
     * @type Container
     */
    const container = player.getComponent("minecraft:inventory").container;
    const itemhand = container.getItem(player.selectedSlotIndex);

    if (!itemhand) return;
    if (itemhand.typeId.includes("pickaxe")) {
        if (blocktype in miningXPTable) {
            db.set(
                player,
                "miningcurrentExp",
                miningcurrentxp + miningXPTable[blocktype]
            );

            if (miningcurrentxp >= getXPForLevel(mininglvl)) {
                db.set(player, "miningcurrentExp", 0);
                db.set(player, "mining", mininglvl + 1);
                player.sendMessage(
                    `Mining: ${mininglvl} => ${
                        mininglvl + 1
                    }`
                );
            }
            // player.sendMessage(`${miningcurrentxp} : ${getXPForLevel(mininglvl)}`)
            sendNotifyActionbar(
                player,
                drawXPBar(miningcurrentxp, getXPForLevel(mininglvl))
            );
        }
    } else if (itemhand.typeId.includes("axe")) {
        if (blocktype in miningXPTable) {
            sendNotifyActionbar(
                player,
                `+${woodcuttingXPTable[blocktype]}Wood Cutting Exp`
            );
        }
    } else if (itemhand.typeId.includes("shovel")) {
        if (blocktype in excavationXPTable) {
            console.warn(`score: ${excavationXPTable[blocktype]}`);
            sendNotifyActionbar(
                player,
                `+${excavationXPTable[blocktype]} Excavation Exp`
            );
        }
    } else if (itemhand.typeId.includes("hoe")) {
        if (blocktype in herbalismXPTable) {
            sendNotifyActionbar(
                player,
                `+${herbalismXPTable[blocktype]} Herbalism Exp`
            );
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
