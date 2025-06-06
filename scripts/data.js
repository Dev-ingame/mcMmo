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
            return player.getDynamicProperty(id);
        } catch (error) {
            return id + " not found";
        }
    }
    /**
     *
     * @param {Player} player
     */
    has(player, id) {
        return  player.getDynamicPropertyIds().find(id) ? true : false 
    }
    /**
     *
     * @param {Player} player
     */
    getAll(player) {
        return player.getDynamicPropertyIds();
    }
}
