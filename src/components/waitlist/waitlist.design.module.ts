import { WaitlistPublishModule } from "./waitlist.publish.module";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { WaitlistEditor } from "./ko/waitlistEditor";
import { WaitlistHandlers } from "./waitlistHandlers";

export class WaitlistDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new WaitlistPublishModule());
        injector.bind("clickCounterEditor", WaitlistEditor);
        injector.bindToCollection("widgetHandlers", WaitlistHandlers);
    }
}