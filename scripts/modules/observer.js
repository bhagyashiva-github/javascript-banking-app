// A simple implementation of the EventEmitter pattern using ES6+ features
export default class EventEmitter {
  // Private Map to store event names as keys and arrays of listener functions as values
  #events = new Map();

  // Registers a listener function for the specified event
  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, []); // Initialize the array if event is new
    this.#events.get(event).push(listener); // Add the listener to the event's array
  }

  // Emits an event, triggering all associated listener functions with an optional payload
  emit(event, payload) {
    (this.#events.get(event) || []).forEach((fn) => fn(payload)); // Call each listener with the payload
  }
}
