import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { ClickCounterRuntime } from "./click-counter-runtime";



// import { RuntimeComponent, Prop, OnMounted, OnDestroyed } from "@paperbits/common/vue/decorators";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector, Component, Input } from "@angular/core";
import { createCustomElement } from "@angular/elements";



@NgModule({
    declarations: [ClickCounterRuntime],
    imports: [BrowserModule],
    entryComponents: [ClickCounterRuntime]
})
export class AppModule {
    constructor(private injector: Injector) {
        const myComponent = createCustomElement(ClickCounterRuntime, { injector: this.injector });

        console.log(myComponent);
        customElements.define("click-counter-runtime", myComponent);
    }

    public ngDoBootstrap() {
        //
    }
}



export class ClickCounterRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        // injector.bind("clickCounterRuntime", ClickCounterRuntime);


        platformBrowserDynamic()
            .bootstrapModule(AppModule)
            .catch(errors => console.log(errors));
    }
}