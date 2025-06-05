import { Player } from "@minecraft/server";
import { ActionFormData} from "@minecraft/server-ui";

/**
 *
 * @param {Player} target
 */
export function stat(target) {
    new ActionFormData().title("stat").body("test").button("ok").show(target);
}
