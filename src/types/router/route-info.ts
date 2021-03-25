import { RouteCondition } from "./route-condition";
import { RouteHandler } from "./route-handler";

export interface RouteInfo {
    conditions: RouteCondition[] | RouteCondition
    handler: RouteHandler
}
