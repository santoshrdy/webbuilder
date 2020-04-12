import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { WaitlistModel } from "./waitlistModel";


export class WaitlistHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "waitlist",
            displayName: "Hostme: Waitlist",
            iconClass: "paperbits-puzzle-10",
            requires: ["html", "js"],
            createModel: async () => {
                const model = new WaitlistModel();
                model.layout = "horizontal";
                model.restaurantId = "2033";
                model.showCurrentWaitTime = true;
                model.allowFastBooking = true;
                return model;
            }
        };

        return widgetOrder;
    }
}