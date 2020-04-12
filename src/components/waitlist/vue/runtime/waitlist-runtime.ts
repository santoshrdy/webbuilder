import axios from "axios";
import i18n from "./i18n/i18n";
import template from "./waitlist-runtime.html";
import iframeTemplate from "./script/iframe-template.html";
import { Prop, OnMounted, OnDestroyed, OnCreated, Watch } from "@paperbits/common/vue/decorators";
import { Computed } from "@paperbits/common/vue/decorators/computed.decorator";
import { RuntimeComponent } from "../../../runtimeComponent.decorator";
import { Utils } from "./script/utils";
import { Component } from "../../../component.decorator";

declare const API_GUEST_HOST;
declare const API_CORE;
declare const API_HOST;

export let apiGuestHost: string = "https://hostme-webguest.azurewebsites.net/"; // API_GUEST_HOST;
export let apiCore: string = "https://service.hostmeapp.com/"; // API_CORE;
export let hostmeUrl: string = "https://tables.hostmeapp.com/"; // API_HOST;


@RuntimeComponent({
    selector: "waitlist-runtime"
})
@Component({
    selector: "waitlist-runtime",
    template: template,
    i18n: i18n
})
export class WaitlistRuntime {
    public restaurantConfig: any = null;
    public working: boolean = true;
    public updateCurrentWaitTimeTimer: any = null;
    public showLogo: boolean = false;
    public expectedTimeLeft: any = null;

    @Prop()
    public restaurantId: any;

    @Prop()
    public showCurrentWaittime: boolean;

    @Prop()
    public allowFastBooking: boolean;

    @Prop()
    public widgetType: string;

    @Prop()
    public onlineUpdateOff: boolean;

    @Prop()
    public openInIframe: boolean;

    @Prop()
    public disableHostme: boolean;

    @Computed()
    public isExpectedTimeUnderFiveMinutes(): boolean {
        return false;
        // return this.expectedTimeLeft >= 0 && typeof this.expectedTimeLeft !== "string" ? Number(this.expectedTimeLeft) <= 5 : false;
    }

    @Computed()
    public isRestaurantOpenNow(): boolean {
        return this.restaurantConfig?.openingHours?.isOpenNow || false;
    }

    @Computed()
    public isAvailableOnlineWaitlist(): boolean {
        return this.restaurantConfig?.services?.waitlist || false;
    }

    @Computed()
    public isCorrectedExpectedTime(): boolean {
        return this.expectedTimeLeft !== undefined &&
            this.expectedTimeLeft !== null &&
            this.expectedTimeLeft !== "" &&
            (this.expectedTimeLeft >= 0 || typeof this.expectedTimeLeft === "string");
    }

    @Watch("restaurantId")
    @Watch("widgetType")
    public onRestaurantChange(): void {
        this.loadRestaurant();
    }

    /**
     * Injects element containing IFRAME into document
     */
    public createIframeTpl(): void {
        const iframePopupClass: string = "j-hostme-popup-waitlist-iframe";

        if (!document.querySelector(`.${iframePopupClass}`) && !!this.allowFastBooking) {
            const template = iframeTemplate;
            const div = document.createElement("div");

            // iE 11 do not support multiply class adding
            div.classList.add(iframePopupClass);
            div.classList.add("hostme-popup-waitlist");
            div.innerHTML = template;
            document.body.appendChild(div);

            this.setCloseIframeEvent(iframePopupClass);
        }
    }

    public openIframe(): void {
        // tslint:disable-next-line:no-shadowed-variable
        const url: string = hostmeUrl + "profile#/get-in-line/" + this.restaurantId + "/";
        const iframePopup = document.querySelector(".j-hostme-popup-waitlist-iframe");

        if (!iframePopup) {
            console.error("Hostme widget. Can't found iframe template. Please contact with us.");
            window.open(url);
            return;
        }

        const scrollPosition: number = document.body.getBoundingClientRect().top;
        const docWidth = window.getComputedStyle(document.body, null).getPropertyValue("width");

        // save for usage then close
        iframePopup.setAttribute("scrollPos", `${scrollPosition}`);
        document.body.style.position = "fixed";
        document.body.style.width = docWidth;

        if (scrollPosition) {
            document.body.style.top = scrollPosition + "px";
        }

        const iframe = iframePopup.getElementsByClassName("j-hostme-waitlist-iframe")[0];

        if (iframe) {
            if (iframe.className.indexOf("waitlist-listener-is-added") === -1) {
                (iframe as any).onload = () => {
                    const loadingLogo = document.getElementById("hostme-waitlist-preloading-cnt");

                    if (!iframe.getAttribute("src")) {
                        loadingLogo.style.opacity = "1";
                        setTimeout((): void => {
                            loadingLogo.style.display = "block";
                        }, 500);
                    }
                    else {
                        loadingLogo.style.opacity = "0";
                        setTimeout((): void => {
                            loadingLogo.style.display = "none";
                        }, 500);
                    }
                };
                iframe.classList.add("waitlist-listener-is-added");
            }
            iframePopup.classList.add("show");
            iframe.setAttribute("src", url);
            setTimeout(() => {
                iframePopup.classList.add("apply-animation");
            }, 300);
        }
        else {
            console.error("Hostme widget. Can't found iframe template. Please contact with us.");
            window.open(url);
        }
    }

    public async getExpectedTime(): Promise<void> {
        if (isNaN(this.restaurantId) !== false) {
            return;
        }

        const response = await axios.get(`${apiCore}api/rsv/mb/guest/restaurants/${this.restaurantId}/walkins/expected?partySizes=2,3,4`);

        if (response && response.data) {
            let minCurrentTimeExpected = null;

            Object.keys(response.data.expectedMinutesForSizes)
                .forEach(key => {
                    if (minCurrentTimeExpected === null || minCurrentTimeExpected > response.data.expectedMinutesForSizes[key]) {
                        minCurrentTimeExpected = response.data.expectedMinutesForSizes[key];
                    }
                });

            if (minCurrentTimeExpected <= 5) {
                minCurrentTimeExpected = 5;
            }

            let maxCurrentTimeExpected = null;

            Object.keys(response.data.expectedMinutesForSizes)
                .forEach(key => {
                    if (maxCurrentTimeExpected === null || maxCurrentTimeExpected < response.data.expectedMinutesForSizes[key]) {
                        maxCurrentTimeExpected = response.data.expectedMinutesForSizes[key];
                    }
                });

            if (maxCurrentTimeExpected <= 5) {
                maxCurrentTimeExpected = 5;
            }

            if (minCurrentTimeExpected === maxCurrentTimeExpected) {
                this.expectedTimeLeft = minCurrentTimeExpected;
            }
            else {
                if (maxCurrentTimeExpected <= 5) {
                    this.expectedTimeLeft = 5;
                }
                this.expectedTimeLeft = minCurrentTimeExpected + " - " + maxCurrentTimeExpected;
            }
        }
    }

    private setCloseIframeEvent(iframeClass: string): void {
        const closeBtn = document.querySelector(".j-hostme-close-waitlist-iframe");
        const iframePopup = document.querySelector(`.${iframeClass}`);

        if (closeBtn && iframePopup) {
            closeBtn.addEventListener("click", () => {
                iframePopup.classList.remove("apply-animation");
                const scrollPosition: string = iframePopup.getAttribute("scrollPos");
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";

                if (scrollPosition) {
                    window.scrollTo(0, -scrollPosition);
                }

                const iframe = iframePopup.getElementsByClassName("j-hostme-waitlist-iframe")[0];

                if (iframe) {
                    iframe.setAttribute("src", "");
                }

                setTimeout(() => {
                    iframePopup.classList.remove("show");
                }, 300); // animation duration;
            });
        }
    }

    private disableLogo(restaurant: any): void {
        const disableLogoSettings = restaurant?.reservationConfig?.uiCustomization?.disableLogoInWidgets || false;
        this.showLogo = this.disableHostme !== true && disableLogoSettings === false;
    }

    private async loadRestaurant(): Promise<void> {
        try {
            this.working = true;
            this.restaurantConfig = null;

            const response = await axios.get<any>(`${apiGuestHost}api/core/mb/guest/restaurants/${this.restaurantId}`);

            if (response?.data) {
                const currentRestaurantInfo = response?.data || {};
                this.restaurantConfig = response.data && response.data || null;
                this.disableLogo(currentRestaurantInfo);
            }
        }
        finally {
            this.working = false;
        }
    }

    @OnMounted()
    public async initialize(): Promise<void> {
        this.createIframeTpl();

        this.getExpectedTime();

        this.updateCurrentWaitTimeTimer = setInterval(() => {
            this.getExpectedTime();
        }, 60000);

        const closeBtn = document.querySelector(".j-hostme-close-waitlist-iframe");

        window.addEventListener("message", event => {
            if (event.data === "hide-iframe-cross") {
                if (closeBtn.classList.contains("hide-iframe-cross-button") !== true) {
                    closeBtn.classList.add("hide-iframe-cross-button");
                }
            }
            else if (event.data === "show-iframe-cross") {
                if (closeBtn.classList.contains("hide-iframe-cross-button") === true) {
                    closeBtn.classList.remove("hide-iframe-cross-button");
                }
            }
        }, false);
    }

    @OnDestroyed()
    public cleanup(): void {
        clearInterval(this.updateCurrentWaitTimeTimer);
        console.log("Cleaning up");
    }
}