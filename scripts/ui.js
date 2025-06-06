import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { pstats } from "./xpTables";
import { Database } from "./data";

const db = new Database();
/**
 *
 * @param {Player} target
 */
export function stat(target) {
    const form = new ActionFormData().title("stat");

    let cache = [];

    pstats.forEach((item) => {
        cache.push({item:[db.get(target,item)]})
    });
    form.body(JSON.stringify(cache))
    form.button("ok");
    form.show(target);
}
