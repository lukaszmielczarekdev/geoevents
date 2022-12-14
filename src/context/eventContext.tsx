import { useState, useEffect, createContext, useContext } from "react";
import { Event, EventsContext } from "../utils/interfaces";
import EventService from "../services/eventService";
import UserContext from "./userContext";

const INITIAL_STATE: EventsContext = {
  events: [],
};

EventService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const EventContext = createContext(INITIAL_STATE);

export const EventProvider = ({ children }: React.PropsWithChildren) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const { currentUser } = useContext(UserContext);

  const getEvents = async () => {
    const events = await EventService.getEvents();
    if (events) {
      setEvents(events);
    }
  };

  const handleAddEvent = async (event: Event) => {
    const newEvent = await EventService.addEvent(event);
    if (newEvent) {
      setEvents((events) => [newEvent, ...events]);
    }
  };

  const handleJoinEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.joinEvent(id);
    if (updatedEvent) {
      setSelectedEvent(updatedEvent);
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(updatedEvents);
    }
  };

  const handleLeaveEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.leaveEvent(id);
    if (updatedEvent) {
      setSelectedEvent(updatedEvent);
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(updatedEvents);
    }
  };

  const handleSetSelectedEvent = (id: string | undefined) => {
    if (id === selectedEvent?._id) {
      setSelectedEvent(undefined);
    } else {
      const selected = events.find((event) => event._id === id);
      setSelectedEvent(selected);
    }
  };

  const handleRemoveSelectedEvent = () => {
    setSelectedEvent(undefined);
  };

  const handleRateEvent = async (id: string | undefined, rating: number) => {
    const updatedEvent = await EventService.rateEvent(id, rating);
    if (updatedEvent) {
      const updatedBusinesses = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(updatedBusinesses);
      setSelectedEvent(updatedEvent);
    }
  };

  const handleDeleteEvent = async (id: string | undefined) => {
    const deletedEvent = await EventService.deleteEvent(id);
    if (!deletedEvent) {
      const updatedEvents = events.filter((event) => event._id !== id);
      setEvents(updatedEvents);
      setSelectedEvent(undefined);
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      getEvents();
    }
  }, [currentUser]);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        onGetEvents: getEvents,
        onJoinEvent: handleJoinEvent,
        onLeaveEvent: handleLeaveEvent,
        onAddEvent: handleAddEvent,
        onRateEvent: handleRateEvent,
        onSetSelectedEvent: handleSetSelectedEvent,
        onRemoveSelectedEvent: handleRemoveSelectedEvent,
        onDeleteEvent: handleDeleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
