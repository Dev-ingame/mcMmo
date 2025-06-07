import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { pstats } from "./xpTables";
import { Database } from "./data";

const db = new Database();

/**
 * @param {Player} target
 */
export function stat(target) {
    const form = new ActionFormData().title("Stat");

    let cache = "";

    pstats.forEach((item) => {
        const value = db.get(target, item);
        cache += `${item}: ${value}\n`;
    });

    form.body(cache);
    form.button("OK");

    form.show(target).catch(() => {});
}
