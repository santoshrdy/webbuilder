import { WaitlistViewModel } from "./waitlistViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { WaitlistModel } from "../waitlistModel";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { Bag } from "@paperbits/common";

export class ClickCounterViewModelBinder implements ViewModelBinder<WaitlistModel, WaitlistViewModel>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: WaitlistModel, viewModel?: WaitlistViewModel, bindingContext?: Bag<any>): Promise<WaitlistViewModel> {
        if (!viewModel) {
            viewModel = new WaitlistViewModel();
        }

        viewModel.restaurantId(model.restaurantId);
        viewModel.layout(model.layout);
        viewModel.allowFastBooking(model.allowFastBooking);
        viewModel.showCurrentWaitTime(model.showCurrentWaitTime);

        const binding: IWidgetBinding<WaitlistModel> = {
            name: "waitlist",
            displayName: "Waitlist",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            editor: "waitlist-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: WaitlistModel): boolean {
        return model instanceof WaitlistModel;
    }
}