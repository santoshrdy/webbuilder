import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { WaitlistRuntime } from "./vue/runtime/waitlist-runtime";

export class WaitlistRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("waitlistRuntime", WaitlistRuntime);
    }
}