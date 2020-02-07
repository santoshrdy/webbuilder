/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "./polyfills";
import { InversifyInjector } from "@paperbits/common/injection";
import { OfflineModule } from "@paperbits/common/offline/offline.module";

const injector = new InversifyInjector();
injector.bindModule(new OfflineModule());
injector.resolve("autostart");