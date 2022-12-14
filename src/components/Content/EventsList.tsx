import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event, EventsListProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";
import { ListItem } from "@mui/material";

const EventsList = ({ items }: EventsListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <>
      {items.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: palette?.background.primary,
            color: "white",
            padding: 1,
            marginBottom: { xs: "0", md: "-5rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {items.map((event: Event) => (
            <EventHeader key={event._id} variant={"list"} event={event} />
          ))}
        </List>
      ) : (
        <ListItem
          sx={{
            borderRadius: "15px",
            background: palette?.background.tertiary,
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 1.5rem",
            alignItems: "flex-start",
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            color: palette?.text.primary,
          }}
        >
          No events to display
        </ListItem>
      )}
    </>
  );
};

export default EventsList;
