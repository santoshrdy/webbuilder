import * as ko from "knockout";
import template from "./waitlistEditor.html";
import { WaitlistModel } from "../waitlistModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";

@Component({
    selector: "waitlist-editor",
    template: template
})
export class WaitlistEditor implements WidgetEditor<WaitlistModel> {
    public readonly layout: ko.Observable<string>;
    public readonly restaurantId: ko.Observable<string>;
    public readonly allowFastBooking: ko.Observable<boolean>;
    public readonly showCurrentWaitTime: ko.Observable<boolean>;

    constructor() {
        this.layout = ko.observable("horizontal");
        this.restaurantId = ko.observable();
        this.allowFastBooking = ko.observable();
        this.showCurrentWaitTime = ko.observable();
    }

    @Param()
    public model: WaitlistModel;

    @Event()
    public onChange: (model: WaitlistModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.layout(this.model.layout);
        this.restaurantId(this.model.restaurantId);
        this.allowFastBooking(this.model.allowFastBooking);
        this.showCurrentWaitTime(this.model.showCurrentWaitTime);

        this.layout.subscribe(this.applyChanges);
        this.restaurantId.subscribe(this.applyChanges);
        this.allowFastBooking.subscribe(this.applyChanges);
        this.showCurrentWaitTime.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.layout = this.layout();
        this.model.restaurantId = this.restaurantId();
        this.model.allowFastBooking = this.allowFastBooking();
        this.model.showCurrentWaitTime = this.showCurrentWaitTime();

        this.onChange(this.model);
    }
}
