import { useCallback, useEffect } from 'react';

import EventEmitter, { Events } from 'utils/EventEmitter';

export const useListener = <Event extends keyof Events>(event: Event, callback: Events[Event]) => {
    const events = EventEmitter.getInstance();
    useEffect(() => events.subscribe(event, callback), [callback, event, events]);
};

export const useEmitter = <Event extends keyof Events>(event: Event) => {
    const events = EventEmitter.getInstance();
    return useCallback((...args: Parameters<Events[Event]>) => events.emit(event, ...args), [event, events]);
};
