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

import {Runnable} from './runnable.js';

export type Result = 'pass' | 'fail';

export class Test extends Runnable {
  result: Result|null = null;
  error: Error;

  async run() {
    console.log(`Running test ${this.title}`);
    try {
      const result = await super.run();
      // returning false is a failure, everything else is a pass
      this.result = result === false ? 'fail' : 'pass';
    } catch (e) {
      this.result = 'fail';
      this.error = e;
      console.error(e);
    } finally {
      console.log(`Finished test ${this.title}: ${this.result}`);
    }
  }
}
