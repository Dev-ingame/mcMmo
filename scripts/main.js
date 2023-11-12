import { world } from "@minecraft/server";
import utils from "./utils";
import { Block } from "./utils";
const overworld = world.getDimension("overworld");
const players = world.getPlayers();
const utls = new utils();
const block = new Block();
world.afterEvents.worldInitialize.subscribe((ev) => {
    console.log("World initialized");
    players.forEach((e) => {
        if (utls.getPlayers(e, "MiningLvl") || utls.getPlayers(e, "MiningXp")) {
            e.setDynamicProperty("MiningLvl");
            e.setDynamicProperty("MiningXp");
        }
    });
});
world.beforeEvents.playerBreakBlock.subscribe((ev) => {
    const player = ev.player;
    const BType = ev.block.typeId;
    if (utls.getObjXpOnBreak(BType)) {
        block.onBreak(player, BType, "MiningXp");
        overworld.runCommandAsync(`say ${utls.getLvll(player, "MiningXp")}`);
    }
    console.log(utls.getObjXpOnBreak(BType));
    console.log(utls.getXp(player, "MiningXp"));
});
world.beforeEvents.chatSend.subscribe((ev) => {
    if (ev.message == "getXp") {
        let mXp = utls.getXp(ev.sender, "MiningXp");
        console.log(mXp);
        ev.cancel = true;
    }
    else if (ev.message == "setminingxp") {
        let mXp = utls.setXp(ev.sender, 50, "MiningXp");
        console.log(mXp);
        ev.cancel = true;
    }
    else if (ev.message == "getPlayers") {
        let mXp = utls.getPlayers(ev.sender, "MiningXp");
        console.log(mXp);
        ev.cancel = true;
    }
    else if (ev.message == "Mining") {
        let mXp = utls.getXp(ev.sender, "MiningXp");
        ev.sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§eMining§a: §e${mXp}"}]}`);
        ev.cancel = true;
    }
    else if (ev.message == "e") {
        utls.addLvl(ev.sender, 0, "MiningLvl");
    }
});

//# sourceMappingURL=../../_cottaDebug/main.js.map
