/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { WaitlistModel } from "./waitlistModel";
import { Contract } from "@paperbits/common";
import { WaitlistContract } from "./waitlistContract";

export class WaitlistModelBinder implements IModelBinder<WaitlistModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "waitlist";
    }

    public canHandleModel(model: WaitlistModel): boolean {
        return model instanceof WaitlistModel;
    }

    public async contractToModel(contract: WaitlistContract): Promise<WaitlistModel> {
        const model = new WaitlistModel();
        model.layout = contract.layout || "horizontal";
        model.restaurantId = contract.restaurantId;
        model.allowFastBooking = contract.allowFastBooking;
        model.showCurrentWaitTime = contract.showCurrentWaitTime;
        return model;
    }

    public modelToContract(model: WaitlistModel): Contract {
        const contract: WaitlistContract = {
            type: "waitlist",
            layout: model.layout,
            restaurantId: model.restaurantId,
            allowFastBooking: model.allowFastBooking,
            showCurrentWaitTime: model.showCurrentWaitTime
        };

        return contract;
    }
}
