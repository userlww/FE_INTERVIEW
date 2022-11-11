class EventBus {
  constructor () {
    this.eventMap = new Map();
  }

  on (eventName, handler) {
    if (!eventName || typeof handler !== 'function') {
      throw new Error('参数不合法');
    }
    if (this.eventMap.has(eventName)) {
      const eventList = this.eventMap.get(eventName);
      eventList.push(handler);
      this.eventMap.set(eventName, eventList);
    } else {
      this.eventMap.set(eventName, [handler]);
    }
  }

  emit (eventName, data) {
    if (this.eventMap.has(eventName)) {
      const eventList = this.eventMap.get(eventName);
      if (Array.isArray(eventList) && eventList.length) {
        eventList.forEach(fn => {
          fn({
            eventKey: eventName,
            data
          });
        });
      }
    }
  }

  off (eventName, handler) {
    if (!eventName || typeof handler !== 'function') {
      throw new Error('参数不合法');
    }
    if (this.eventMap.has(eventName)) {
      const eventList = this.eventMap.get(eventName);
      if (Array.isArray(eventList)) {
        let idx = eventList.indexOf(handler);
        while (idx > -1) {
          idx = eventList.indexOf(handler);
          eventList.splice(idx, 1);
        }
        }
        if (!eventList.length) {
          this.eventMap.delete(eventName);
        } else {
          this.eventMap.set(eventName, eventList);
        }
      }
    }
}
