type PubSubCallback = (data?: any) => void;

class PubSub {
    private listeners: Record<string, PubSubCallback[]>;

    constructor() {
        this.listeners = {};
    }

    on(action: string, callback: PubSubCallback) {
        if (this.listeners[action]) {
            this.listeners[action].push(callback);
        } else {
            this.listeners[action] = [callback];
        }
    }

    emit(action: string, data?: any) {
        if (this.listeners[action]) {
            this.listeners[action].forEach(l => l(data));
        }
    }
}

export default new PubSub();