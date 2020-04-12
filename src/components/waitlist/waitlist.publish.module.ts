import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { WaitlistViewModel } from "./ko/waitlistViewModel";
import { WaitlistModelBinder } from "./waitlistModelBinder";
import { ClickCounterViewModelBinder } from "./ko/waitlistViewModelBinder";


export class WaitlistPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("waitlist", WaitlistViewModel);
        injector.bindToCollection("modelBinders", WaitlistModelBinder);
        injector.bindToCollection("viewModelBinders", ClickCounterViewModelBinder);
    }
}