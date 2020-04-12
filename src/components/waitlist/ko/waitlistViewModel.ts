import * as ko from "knockout";
import template from "./waitlist.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "waitlist",
    template: template
})
export class WaitlistViewModel {
    public readonly layout: ko.Observable<string>;
    public readonly allowFastBooking: ko.Observable<boolean>;
    public readonly restaurantId: ko.Observable<string>;
    public readonly showCurrentWaitTime: ko.Observable<boolean>

    constructor() {
        this.layout = ko.observable();
        this.restaurantId = ko.observable();
        this.allowFastBooking = ko.observable(true);
        this.showCurrentWaitTime = ko.observable(true);
    }
}
