import template from "./click-counter-runtime.html";
import { Component, Input } from "@angular/core";

// @RuntimeComponent({
//     selector: "click-counter-runtime"
// })
@Component({
    selector: "click-counter-runtime",
    template: template
})
export class ClickCounterRuntime {
    public clickCount: number;

    constructor() {
        this.clickCount = 0;
    }

    @Input()
    public readonly initialCount: number;

    public async ngOnInit(): Promise<void> {
        this.clickCount = this.initialCount;
    }

    public increaseCount(): void {
        this.clickCount = this.clickCount + 1;
    }
}

