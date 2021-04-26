import { useEffect, useState } from 'react';

export default (contract: any, eventName: string, onNewEvent?: (event: any) => void) => {
  const [events, setEvents] = useState<any[] | null>(null);

  useEffect(() => {
    contract.getPastEvents(eventName, { fromBlock: 0, toBlock: "latest" })
      .then((events: any[]) => {
        setEvents(events);
      });

      contract.events[eventName]()
      .on("data", (event: any) => {
          setEvents(events => events ? [...events, event] : [event]);

          onNewEvent && onNewEvent(event);

      }).on("error", console.error);
  }, []);

  return events;
};