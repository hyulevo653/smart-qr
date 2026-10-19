export class CsEvent {
  name: string;
  callbacks: Function[];

  constructor(name: string) {
      this.name = name;
      this.callbacks = [];
  }

  registerCallback(callback: Function) {
      this.callbacks.push(callback);
  }

  removeCallback(callback: Function) {
      this.callbacks.filter((item) => item !== callback);
  }
}

class Reactor {
  events: { [eventName: string]: CsEvent };

  constructor() {
      this.events = {};
  }

  registerEvent(eventName: string) {
      const event = new CsEvent(eventName);
      this.events[eventName] = event;
  }

  dispatchEvent(eventName: string, eventArgs?: any) {
      this.events[eventName].callbacks.forEach((callback) => {
          callback(eventArgs);
      });
  }

  addEventListener(eventName: string, callback: Function) {
      this.events[eventName].registerCallback(callback);
  }

  removeEventListener(eventName: string, callback: Function) {
      callback ? this.events[eventName].removeCallback(callback) : (this.events[eventName].callbacks = []);
  }
}

export const reactor = new Reactor();
