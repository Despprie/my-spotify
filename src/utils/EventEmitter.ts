export type Events = {
    'refresh-spotify-tokens': (refreshToken: string) => void;
};

class EventEmitter {
    private static instance: EventEmitter;
    private subscribers = {} as Record<keyof Events, Set<(...args: any[]) => void>>;

    private constructor() {}

    static getInstance() {
        if (!EventEmitter.instance) EventEmitter.instance = new EventEmitter();
        return EventEmitter.instance;
    }

    subscribe<Event extends keyof Events>(event: Event, callback: Events[Event]) {
        if (this.subscribers[event]) this.subscribers[event].add(callback);
        else this.subscribers[event] = new Set([callback]);

        return () => {
            this.subscribers[event].delete(callback);
        };
    }

    emit<Event extends keyof Events>(event: Event, ...args: Parameters<Events[Event]>) {
        this.subscribers[event]?.forEach(callback => callback(...args));
    }
}

export default EventEmitter;
