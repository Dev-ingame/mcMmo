import { world } from "@minecraft/server";
import { blocks, MiningLvl } from "./blocks";
export default class utils {
    constructor() {
        this.overworld = world.getDimension("overworld");
        this.players = world.getPlayers();
    }
    addXp(player, amount, xpType) {
        player.setDynamicProperty(xpType, this.getXp(player, xpType) + amount);
    }
    setXp(player, amount, xpType) {
        player.setDynamicProperty(xpType, amount);
    }
    removeXp(player, amount, xpType) {
        player.setDynamicProperty(xpType, this.getXp(player, xpType) - amount);
    }
    getXp(player, xpType) {
        return player.getDynamicProperty(xpType);
    }
    getObjXpOnPlace(type) {
        for (const block of blocks) {
            for (const key in block) {
                if (key === type) {
                    return block[key].place;
                }
            }
        }
        return 0;
    }
    getObjXpOnBreak(type) {
        for (const block of blocks) {
            for (const key in block) {
                if (key === type) {
                    return block[key].break;
                }
            }
        }
        return 0;
    }
    getPyLvl(player, xpType) {
        const Xp = this.getXp(player, "MiningXp");
        let mngLvl = 1;
        for (const lvlData of MiningLvl) {
            if (lvlData[mngLvl] && Xp >= lvlData[mngLvl].MiningXp) {
                mngLvl++;
                return this.overworld.runCommandAsync(`title ${player.name} actionbar Mining Increase To ${mngLvl}`);
                break;
            }
            else {
                break;
            }
        }
        return mngLvl;
    }
    getPlayer(player, xpType) {
        this.players.forEach((e) => {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].getDynamicProperty(xpType)) {
                    console.log(this.players[i].name);
                }
            }
        });
    }
}
export class Block {
    onBreak(player, blockType, xpType) {
        const xpAmount = this.CalXpOnBreak(blockType);
        player.setDynamicProperty(xpType, this.getXp(player, xpType) + xpAmount);
    }
    onPlace(player, blockType, xpType) {
        const xpAmount = this.CalXpOnPlace(blockType);
        player.setDynamicProperty(xpType, this.getXp(player, xpType) + xpAmount);
    }
    CalXpOnBreak(blockType) {
        for (const block of blocks) {
            for (const key in block) {
                if (key === blockType) {
                    return block[key].break;
                }
            }
        }
        return 0;
    }
    CalXpOnPlace(blockType) {
        for (const block of blocks) {
            for (const key in block) {
                if (key === blockType) {
                    return block[key].place;
                }
            }
        }
        return 0;
    }
    getXp(player, xpType) {
        // Your logic to get the player's XP for the specified type
        return player.getDynamicProperty(xpType) || 0;
    }
}

//# sourceMappingURL=../../_cottaDebug/utils.js.map
