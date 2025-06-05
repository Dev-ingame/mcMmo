import { world } from "@minecraft/server";
import { sendNotifyActionbar } from "./utils";
import { stat } from "./ui";
import { excavationXPTable, fishingXPTable, herbalismXPTable, miningXPTable, woodcuttingXPTable } from "./data";

world.afterEvents.itemUse.subscribe((event) => {
    const item = event.itemStack;
    console.warn(item.typeId);
    if (item.typeId === "minecraft:compass") {
        stat(event.source);
    }
});

world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block = event.block;
    const player = event.player;

    const blocktype = block.typeId.toLowerCase().replace("minecraft:", "");
    console.warn(block.typeId);
    if (blocktype in miningXPTable) {
        console.warn(`blockscore: ${miningXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Mining Point`);
    } else if (blocktype in woodcuttingXPTable) {
        console.warn(`blockscore: ${woodcuttingXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Wood Cutting Point`);
    } else if (blocktype in excavationXPTable) {
        console.warn(`blockscore: ${excavationXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Excavation Point`);
    } else if (blocktype in herbalismXPTable) {
        console.warn(`blockscore: ${herbalismXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Excavation Point`);
    } else if (blocktype in fishingXPTable){
        console.warn(`blockscore: ${fishingXPTable[blocktype]}`);
        sendNotifyActionbar(player, `+1 Excavation Point`);
    }
});

world.afterEvents.entityDie.subscribe(event=>{
    const target = event.deadEntity
    const source = event.damageSource
})