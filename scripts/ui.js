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
    new ActionFormData()
        .title("stat")
        .body(
            `${pstats.forEach((item) => {
                db.get(target, item);
            })}`
        )
        .button("ok")
        .show(target);
}
