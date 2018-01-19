/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {Test} from './test.js';
import {Suite} from './suite.js';

export function suite(name: string, suiteFn: Function) {
  Suite.currentSuite.add(new Suite(name, suiteFn, Suite.currentSuite));
}

export function test(name: string, testFn: Function) {
  Suite.currentSuite.add(new Test(name, testFn, Suite.currentSuite));
}

export async function run() {
  console.log('Starting Tests');
  await Suite.rootSuite.run();
  console.log('Tests Complete');
}

// go!
Promise.resolve().then(run);
