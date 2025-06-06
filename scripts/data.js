import { Player } from "@minecraft/server";

export class Database {
    /**
     *
     * @param {Player} player
     * @param {any} value
     */
    set(player, id, value) {
        return player.setDynamicProperty(id, value);
    }
    /**
     *
     * @param {Player} player
     * @param {any} value
     */
    get(player, id) {
        try {
            return player.getDynamicProperty(id)
        } catch (error) {
            return "not found"
        };
    }
    /**
     *
     * @param {Player} player
     */
    has(player, id) {
        return player.getDynamicPropertyIds().find(id);
    }
}
