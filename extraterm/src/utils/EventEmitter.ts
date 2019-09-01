/*
 * Copyright 2017-2019 Simon Edwards <simon@simonzone.com>
 *
 * This source code is licensed under the MIT license which is detailed in the LICENSE.txt file.
 */

import {Disposable, Event} from 'extraterm-extension-api';


/**
 * An event emitter which can be subscribe to to hear when this event is fired.
 */
export class EventEmitter<T> {

  private _listeners: ((t: T) => void)[] = [];

  /**
   * Attach a listener to this event.
   * 
   * @param listener the function to call when this event is triggered.
   * @return a `Disposible` which when used disconnects this listener from the event.
   */
  event: Event<T> = (listener: (t: T) => void): Disposable => {
    this._listeners.push(listener);
    return {
      dispose: () => {
        this._listeners = this._listeners.filter(item => item !== listener);
      }
    };
  }

  /**
   * Fire the event to all listeners.
   * 
   * @param t the payload of the event.
   */
  fire(t: T): void {
    this._listeners.forEach(listener => listener(t));
  }
}
