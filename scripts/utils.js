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
    addLvl(player, amount, lvlType) {
        player.setDynamicProperty(lvlType, this.getLvl(player, lvlType) + amount);
    }
    getLvl(player, lvlType) {
        return player.getDynamicProperty(lvlType);
    }
    removeLvl(player, amount, lvlType) {
        player.setDynamicProperty(lvlType, this.getLvl(player, lvlType) - amount);
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
    getLvll(player, xpType) {
        const xp = this.getXp(player, xpType);
        let Lvl = this.getLvl(player, "MiningLvl");
        for (const lvl of MiningLvl) {
            if (lvl[Lvl] && xp >= lvl[Lvl].MiningXp) {
                break;
            }
            else {
                Lvl = Lvl + 1;
            }
            return Lvl;
        }
    }
    getPlayers(player, xpType) {
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
    constructor() {
        this.overworld = world.getDimension("overworld");
    }
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
        return player.getDynamicProperty(xpType) || 0;
    }
}

//# sourceMappingURL=../../_cottaDebug/utils.js.map
