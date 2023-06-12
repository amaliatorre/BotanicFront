import { RouteMilestone } from "./routeMilestones";
import { UsuInfo } from "./usuInfo";

export class LoginResponse{
    usuInfo: UsuInfo;
    routeMilestone: RouteMilestone[];

    constructor(usuInfo: UsuInfo, routeMilestone: RouteMilestone[]) {
      this.usuInfo = usuInfo;
      this.routeMilestone = routeMilestone;
    }
}