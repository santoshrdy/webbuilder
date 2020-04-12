import { Contract } from "@paperbits/common";

export interface WaitlistContract extends Contract {
    layout: string;
    restaurantId: string;
    allowFastBooking: boolean;
    showCurrentWaitTime: boolean;
}