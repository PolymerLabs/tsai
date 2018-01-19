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
import {Test} from './test.js';

export class Suite extends Runnable {
  static rootSuite = new Suite('ROOT', async () => {});
  static currentSuite: Suite = Suite.rootSuite;

  children: (Suite|Test)[] = [];
  beforeEach: Function[] = [];
  beforeAll: Function[] = [];
  afterEach: Function[] = [];
  afterAll: Function[] = [];

  add(child: Suite|Test) {
    this.children.push(child);    
  }

  async run() {
    const parentSuite = Suite.currentSuite;
    Suite.currentSuite = this;
    // console.log(`Suite ${this.title}`, this.children);
    try {
      await this.fn();
    } catch (e) {
      console.error(`Error defining suite ${this.title}`);
      console.error(e);
    } finally {
      Suite.currentSuite = parentSuite;
    }

    for (const fn of this.beforeAll) {
      this._safeRun(fn);
    }

    for (const child of this.children) {
      for (const fn of this.beforeEach) {
        this._safeRun(fn);
      }

      try {
        await child.run();
      } finally {}

      for (const fn of this.afterEach) {
        this._safeRun(fn);
      }

      for (const fn of this.beforeAll) {
        this._safeRun(fn);
      }
    }
  }

  async _safeRun(task: Function): Promise<any> {
    try {
      return await task();
    } finally {}
  }

}
