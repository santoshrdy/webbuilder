// import axios from "axios";
// import Vue from "vue";
// import i18n from "./i18n/i18n";
// import { Utils } from "./script/utils";


// declare const API_GUEST_HOST;
// declare const API_CORE;
// declare const API_HOST;
// export let apiGuestHost: string = API_GUEST_HOST;
// export let apiCore: string = API_CORE;
// export let hostmeUrl: string = API_HOST;
// const initClass: string = "widget-is-init";
// const colorBase1: { varName: string } = {
//     varName: "--color-base-1"
// };
// const colorBase1lighten10: { varName: string } = {
//     varName: "--color-base-1-lighten-10"
// };
// const colorBase1lighten20: { varName: string } = {
//     varName: "--color-base-1-lighten-20"
// };
// const colorBase1darken15: { varName: string } = {
//     varName: "--color-base-1-darken-15"
// };


// ((window: Window, document: Document) => {
//     const widgets = document.getElementsByClassName("j-hostme-waitlist");

//     if (widgets && widgets.length > 0) {
//         for (let i: number = 0; i < widgets.length; i += 1) {
//             const restaurantId: number = +(widgets[i] as any).dataset.hostmeId;
//             if (widgets[i].classList.contains(initClass)) {
//                 return;
//             } else {
//                 createVueWidget(widgets[i], restaurantId, undefined);
//                 widgets[i].classList.add(initClass);
//             }
//         }
//     }
//     else {
//         const widget: HTMLElement = document.getElementById("j-hostme-waitlist");

//         if (widget) {
//             const restaurantId: number = +(widget as any).dataset.hostmeId;

//             if (widget.classList.contains(initClass)) {
//                 return;
//             }
//             else {
//                 createVueWidget(widget, restaurantId, undefined);
//                 widget.classList.add(initClass);
//             }
//         }
//     }

//     function createVueWidget(widget, restaurantId, restaurantJSON): void {
//         const child = document.createElement("div");
//         child.classList.add("hostme-widget");
//         child.setAttribute("id", `j-hostme-widget-${restaurantId}`);
//         widget.appendChild(child);

//         const vueHostmeWaitlistWidget = new Vue({
//             i18n,

//             el: "#" + child.id,

//             data: {
//                 restaurantId,
//                 widget,
//                 restaurantConfig: null,
//                 expectedTimeLeft: null,
//                 updateCurrentWaitTimeTimer: null,
//                 isShowCurrentWaittime: widget.getAttribute("data-show-current-waittime") === "true",
//                 isAllowFastBooking: widget.getAttribute("data-allow-fast-booking") === "true",
//                 widgetType: widget.getAttribute("data-widget-type") === "vertical" ? "vertical" : "horizontal",
//                 onlineUpdateOff: widget.getAttribute("data-online-update-off") !== null,
//                 openInIframe: !!widget.getAttribute("data-allow-fast-booking"),
//             },

//             computed: {
//                 isExpectedTimeUnderFiveMinutes(): boolean {
//                     return this.$data.expectedTimeLeft >= 0 && typeof this.$data.expectedTimeLeft !== "string" ? Number(this.$data.expectedTimeLeft) <= 5 : false;
//                 },

//                 isRestaurantOpenNow(): boolean {
//                     return this.$data.restaurantConfig &&
//                         this.$data.restaurantConfig.openingHours &&
//                         this.$data.restaurantConfig.openingHours.isOpenNow || false;
//                 },

//                 isAvailableOnlineWaitlist(): boolean {
//                     return this.$data.restaurantConfig &&
//                         this.$data.restaurantConfig.services.waitlist || false;
//                 },

//                 isCorrectedExpectedTime(): boolean {
//                     return this.$data.expectedTimeLeft !== undefined &&
//                         this.$data.expectedTimeLeft !== null &&
//                         this.$data.expectedTimeLeft !== "" &&
//                         (this.$data.expectedTimeLeft >= 0 || typeof this.$data.expectedTimeLeft === "string");
//                 }
//             },

//             methods: {
//                 createIframeTpl(widgetEL): void {
//                     const iframePopupClass: string = "j-hostme-popup-waitlist-iframe";

//                     if (!document.querySelector(`.${iframePopupClass}`) && !!widgetEL.getAttribute("data-allow-fast-booking")) {
//                         const template = require("html-loader!./script/iframe-template.html");
//                         const div = document.createElement("div");
//                         // iE 11 do not support multiply class adding
//                         div.classList.add(iframePopupClass);
//                         div.classList.add("hostme-popup-waitlist");
//                         div.innerHTML = template;
//                         document.body.appendChild(div);
//                         this.setCloseIframeEvent(iframePopupClass);
//                     }
//                 },

//                 openIframe(): void {
//                     // tslint:disable-next-line:no-shadowed-variable
//                     const url: string = hostmeUrl + "profile#/get-in-line/" + this.$data.restaurantId + "/";
//                     const iframePopup = document.querySelector(".j-hostme-popup-waitlist-iframe");
//                     if (!iframePopup) {
//                         console.error("Hostme widget. Can't found iframe template. Please contact with us.");
//                         window.open(url);
//                         return;
//                     }
//                     const scrollPosition: number = document.body.getBoundingClientRect().top;
//                     const docWidth = window.getComputedStyle(document.body, null).getPropertyValue("width");
//                     // save for usage then close
//                     iframePopup.setAttribute("scrollPos", `${scrollPosition}`);
//                     document.body.style.position = "fixed";
//                     document.body.style.width = docWidth;

//                     if (scrollPosition) {
//                         document.body.style.top = scrollPosition + "px";
//                     }

//                     const iframe = iframePopup.getElementsByClassName("j-hostme-waitlist-iframe")[0];

//                     if (iframe) {
//                         if (iframe.className.indexOf("waitlist-listener-is-added") === -1) {
//                             (iframe as any).onload = () => {
//                                 const loadingLogo = document.getElementById("hostme-waitlist-preloading-cnt");
//                                 if (!iframe.getAttribute("src")) {
//                                     loadingLogo.style.opacity = "1";
//                                     setTimeout((): void => {
//                                         loadingLogo.style.display = "block";
//                                     }, 500);
//                                 } else {
//                                     loadingLogo.style.opacity = "0";
//                                     setTimeout((): void => {
//                                         loadingLogo.style.display = "none";
//                                     }, 500);
//                                 }
//                             };
//                             iframe.classList.add("waitlist-listener-is-added");
//                         }
//                         iframePopup.classList.add("show");
//                         iframe.setAttribute("src", url);
//                         setTimeout(() => {
//                             iframePopup.classList.add("apply-animation");
//                         }, 300);
//                     } else {
//                         console.error("Hostme widget. Can't found iframe template. Please contact with us.");
//                         window.open(url);
//                     }
//                 },

//                 getExpectedTime() {
//                     if (isNaN(restaurantId) === false) {
//                         axios
//                             .get(`${apiCore}api/rsv/mb/guest/restaurants/${restaurantId}/walkins/expected?partySizes=2,3,4`)
//                             .then(response => {
//                                 if (response && response.data) {
//                                     let minCurrentTimeExpected = null;
//                                     Object.keys(response.data.expectedMinutesForSizes)
//                                         .forEach(key => {
//                                             if (minCurrentTimeExpected === null || minCurrentTimeExpected > response.data.expectedMinutesForSizes[key]) {
//                                                 minCurrentTimeExpected = response.data.expectedMinutesForSizes[key];
//                                             }
//                                         });


//                                     if (minCurrentTimeExpected <= 5) {
//                                         minCurrentTimeExpected = 5;
//                                     }


//                                     let maxCurrentTimeExpected = null;
//                                     Object.keys(response.data.expectedMinutesForSizes)
//                                         .forEach(key => {
//                                             if (maxCurrentTimeExpected === null || maxCurrentTimeExpected < response.data.expectedMinutesForSizes[key]) {
//                                                 maxCurrentTimeExpected = response.data.expectedMinutesForSizes[key];
//                                             }
//                                         });


//                                     if (maxCurrentTimeExpected <= 5) {
//                                         maxCurrentTimeExpected = 5;
//                                     }


//                                     if (minCurrentTimeExpected === maxCurrentTimeExpected) {
//                                         this.$data.expectedTimeLeft = minCurrentTimeExpected;
//                                     } else {
//                                         if (maxCurrentTimeExpected <= 5) {
//                                             this.$data.expectedTimeLeft = 5;
//                                         }
//                                         this.$data.expectedTimeLeft = minCurrentTimeExpected + " - " + maxCurrentTimeExpected;
//                                     }
//                                 }
//                             });
//                     }
//                 },

//                 loadFonts(): void {
//                     const tag = document.createElement("link");
//                     const url: string = "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600";
//                     tag.setAttribute("rel", "stylesheet");
//                     tag.setAttribute("href", url);
//                     (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(tag);
//                 },

//                 getTimeLeft() {
//                     return Utils.getTimeLeftInStringFormat(new Date());
//                 },

//                 stylesIsApply(attributeName: string): boolean {
//                     const styles = document.querySelectorAll("style");

//                     if (styles) {
//                         for (let i: number = 0; i < styles.length; i += 1) {
//                             if (styles[i].getAttribute(attributeName) !== null) {
//                                 return true;
//                             }
//                         }
//                     } else {
//                         return false;
//                     }
//                     return false;
//                 },

//                 addMainStylesForHTML(widgetElem: Element, restaurantData?: any) {
//                     const cssVariablesSupport: boolean = (window as any).CSS && (window as any).CSS.supports &&
//                         ((window as any).CSS.supports("--foo", "red") || (window as any).CSS.supports("(--foo: red)"));

//                     if (cssVariablesSupport && restaurantData && restaurantData.reservationConfig && restaurantData.reservationConfig.uiCustomization && restaurantData.reservationConfig.uiCustomization.guestThemeColor1) {
//                         const mainColor: string = restaurantData.reservationConfig.uiCustomization.guestThemeColor1;

//                         if (!mainColor || mainColor.length !== 7) {
//                             return;
//                         }

//                         (widget as any).style.setProperty(colorBase1.varName, mainColor);
//                         (widget as any).style.setProperty(colorBase1lighten10.varName, this.shadeColor(mainColor, 0.10));
//                         (widget as any).style.setProperty(colorBase1lighten20.varName, this.shadeColor(mainColor, 0.20));
//                         (widget as any).style.setProperty(colorBase1darken15.varName, this.shadeColor(mainColor, -0.15));
//                     }

//                     if (this.stylesIsApply("hostme-waitlist-styles") === true) {
//                         return;
//                     }

//                     console.log("Support css variables");

//                     let appStyles: any;

//                     if (!cssVariablesSupport) {
//                         console.log("Do not support css variables");
//                         // tslint:disable-next-line:max-line-length
//                         appStyles = require("css-loader!postcss-loader!sass-loader!webpack-append?@import 'settings';$base-1:#e16640;$base-2: lighten($base-1, 10%);!./styles/app.scss");
//                     } 
//                     else {
//                         appStyles = require("css-loader!postcss-loader!sass-loader!webpack-append?@import 'settings';!./styles/app.scss");
//                     }

//                     const style = document.createElement("style");
//                     style.setAttribute("hostme-waitlist-styles", "");
//                     style.textContent = appStyles;
//                     widget.insertBefore(style, widget.firstChild);
//                 },

//                 shadeColor(color, percent) {
//                     const f = parseInt(color.slice(1), 16);
//                     const t = percent < 0 ? 0 : 255;
//                     const p = percent < 0 ? percent * -1 : percent;
//                     // tslint:disable-next-line:no-bitwise
//                     const R = f >> 16;
//                     // tslint:disable-next-line:no-bitwise
//                     const G = f >> 8 & 0x00FF;
//                     // tslint:disable-next-line:no-bitwise
//                     const B = f & 0x0000FF;
//                     return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 +
//                         (Math.round((t - B) * p) + B)).toString(16).slice(1);
//                 },

//                 setCloseIframeEvent(iframeClass: string): void {
//                     const closeBtn = document.querySelector(".j-hostme-close-waitlist-iframe");
//                     const iframePopup = document.querySelector(`.${iframeClass}`);
                    
//                     if (closeBtn && iframePopup) {
//                         closeBtn.addEventListener("click", () => {
//                             iframePopup.classList.remove("apply-animation");
//                             const scrollPosition: string = iframePopup.getAttribute("scrollPos");
//                             document.body.style.position = "";
//                             document.body.style.top = "";
//                             document.body.style.width = "";
//                             if (scrollPosition) {
//                                 window.scrollTo(0, -scrollPosition);
//                             }
//                             const iframe = iframePopup.getElementsByClassName("j-hostme-waitlist-iframe")[0];
//                             if (iframe) {
//                                 iframe.setAttribute("src", "");
//                             }
//                             setTimeout(() => {
//                                 iframePopup.classList.remove("show");
//                             }, 300); // animation duration;
//                         });
//                     }
//                 },

//                 disableLogo(widgetEl, restaurant: any) {
//                     const disableLogoSettings: boolean = restaurant && restaurant.reservationConfig &&
//                         restaurant.reservationConfig.uiCustomization && restaurant.reservationConfig.uiCustomization.disableLogoInWidgets || false;

//                     if (widgetEl.getAttribute("data-disable-hostme") === "true" || disableLogoSettings) {
//                         const logo: Element = widgetEl.getElementsByClassName("hostme-waitlist__logo-with-img")[0] ||
//                             widgetEl.getElementsByClassName("hostme-waitlist-horizontal__logo-with-img")[0];
//                         const logoParent: Element = widgetEl.getElementsByClassName("hostme-waitlist")[0] ||
//                             widgetEl.getElementsByClassName("hostme-waitlist-horizontal")[0];
//                         if (logo && logoParent) {
//                             logoParent.removeChild(logo);
//                         }
//                     }
//                 }
//             },

//             created() {
//                 this.createIframeTpl(widget);
//                 if (this.stylesIsApply("hostme-waitlist-min-styles") === false) {
//                     const appMinStyles = require("css-loader!postcss-loader!sass-loader!webpack-append?@import 'settings';!./styles/min-init-styles.scss");
//                     const style = document.createElement("style");
//                     style.setAttribute("hostme-waitlist-min-styles", "");
//                     style.textContent = appMinStyles;
//                     widget.insertBefore(style, widget.firstChild);
//                 }
//                 axios
//                     .get(`${apiGuestHost}api/core/mb/guest/restaurants/${restaurantId}`)
//                     .then(response => {
//                         if (response && response.data) {
//                             const currentRestaurantInfo = response && response.data && response.data || {};
//                             this.$data.restaurantConfig = response.data && response.data || null;
//                             this.addMainStylesForHTML(this.$data.widget, currentRestaurantInfo);
//                             this.disableLogo(this.$data.widget, currentRestaurantInfo);
//                         }
//                     });
//                 this.getExpectedTime();
//                 this.$data.updateCurrentWaitTimeTimer = setInterval(() => {
//                     this.getExpectedTime();
//                 }, 60000);
//                 this.loadFonts();
//                 const closeBtn = document.querySelector(".j-hostme-close-waitlist-iframe");
//                 window.addEventListener("message", event => {
//                     if (event.data === "hide-iframe-cross") {
//                         if (closeBtn.classList.contains("hide-iframe-cross-button") !== true) {
//                             closeBtn.classList.add("hide-iframe-cross-button");
//                         }
//                     } else if (event.data === "show-iframe-cross") {
//                         if (closeBtn.classList.contains("hide-iframe-cross-button") === true) {
//                             closeBtn.classList.remove("hide-iframe-cross-button");
//                         }
//                     }
//                 }, false);
//             },

//             mounted() {
//                 // TODO
//             },

//             destroyed() {
//                 clearInterval(this.$data.updateCurrentWaitTimeTimer);
//             },

//             template: require("html-loader!./hostme-waitlist.html")
//         });
//     }
// })(window, document);

