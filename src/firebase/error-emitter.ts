
// A simple, browser-safe event emitter replacement for Node's 'events'
class SimpleEventEmitter {
    private listeners: Record<string, Function[]> = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, ...args: any[]) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(...args));
        }
    }

    removeListener(event: string, callback: Function) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
}

// This is a simple event emitter that can be used to broadcast errors
// from anywhere in the application (Client or Server).
export const errorEmitter = new SimpleEventEmitter();
