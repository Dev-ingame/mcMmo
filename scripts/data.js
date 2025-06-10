import { Player } from "@minecraft/server";

export class Database {
    /**
     * @param {Player} player
     * @param {string} id
     * @param {any} value
     */
    set(player, id, value = undefined) {
        return player.setDynamicProperty(id, value);
    }

    /**
     * @param {Player} player
     * @param {string} id
     * @returns {any}
     */
    get(player, id) {
        try {
            return player.getDynamicProperty(id);
        } catch {
            return null;
        }
    }

    /**
     * @param {Player} player
     * @param {string} id
     * @returns {boolean}
     */
    has(player, id) {
        return player.getDynamicPropertyIds().includes(id);
    }

    /**
     * @param {Player} player
     * @returns {string[]}
     */
    getAll(player) {
        return player.getDynamicPropertyIds();
    }
}
