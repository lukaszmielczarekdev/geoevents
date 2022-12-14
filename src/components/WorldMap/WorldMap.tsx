import { useState, useEffect, useContext, useRef } from "react";
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  Popup,
  MapLayerMouseEvent,
} from "react-map-gl";
import Markers from "./Markers";
import EventContext from "../../context/eventContext";
import BusinessContext from "../../context/businessContext";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { PinCardProps } from "../../utils/interfaces";
import { notify } from "../../utils/notifications";
import EventHeader from "../Content/EventHeader";
import BusinessHeader from "../Content/BusinessHeader";
import PopupController from "./PopupController";
import Geocoder from "./Coder";

const WorldMap = () => {
  const { selectedEvent } = useContext(EventContext);
  const { selectedBusiness } = useContext(BusinessContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [newMarker, setNewMarker] = useState<PinCardProps | null>(null);
  const [key, setKey] = useState<number>(Math.random());

  const [viewState, setViewState] = useState({
    longitude: 24,
    latitude: 50,
    zoom: 4,
  });

  const geoMap = useRef<any>();

  const flyToLocation = (ref: any, coordinates: any) => {
    ref.current.flyTo({
      center: coordinates,
      duration: 5000,
      offset: [-100, -200],
    });
  };

  const handleDoubleClick = (e: MapLayerMouseEvent) => {
    if (currentUser) {
      const { lng, lat } = e.lngLat;
      setNewMarker({ lng, lat, type: null });
    } else {
      notify("Only registered users can add markers.");
    }
  };

  useEffect(() => {
    setKey(Math.random());
    if (selectedBusiness) {
      flyToLocation(geoMap, [
        selectedBusiness.coordinates?.lng,
        selectedBusiness.coordinates?.lat,
      ]);
    }
    if (selectedEvent) {
      flyToLocation(geoMap, [
        selectedEvent.coordinates?.lng,
        selectedEvent.coordinates?.lat,
      ]);
    }
  }, [selectedEvent, selectedBusiness]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        minHeight: { xs: "90vh", md: "600px" },
        maxHeight: "fit-content",
        background: palette?.background.primary,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        borderRadius: "25px",
      }}
    >
      <Map
        ref={geoMap}
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25px",
        }}
        mapStyle={`https://api.maptiler.com/maps/${palette?.map.style}/style.json?key=${process.env.REACT_APP_MAP_API_KEY}`}
        doubleClickZoom={false}
        onDblClick={handleDoubleClick}
      >
        <Geocoder />
        <NavigationControl />
        <GeolocateControl
          trackUserLocation={true}
          positionOptions={{
            enableHighAccuracy: true,
          }}
        />
        <FullscreenControl />
        <Markers key={key} />
        {newMarker ? (
          <PopupController newMarker={newMarker} setNewMarker={setNewMarker} />
        ) : null}
        {selectedEvent || selectedBusiness ? (
          <Popup
            key={key + 1}
            style={{ background: "transparent" }}
            //@ts-ignore
            longitude={
              selectedEvent
                ? selectedEvent?.coordinates?.lng
                : selectedBusiness?.coordinates?.lng
            }
            //@ts-ignore
            latitude={
              selectedEvent
                ? selectedEvent?.coordinates?.lat
                : selectedBusiness?.coordinates?.lat
            }
            anchor="top-left"
          >
            {selectedEvent ? (
              <EventHeader
                key={selectedEvent._id}
                variant={"masonry"}
                popup
                event={selectedEvent}
              />
            ) : null}
            {selectedBusiness ? (
              <BusinessHeader
                key={selectedBusiness._id}
                variant={"masonry"}
                popup
                business={selectedBusiness}
              />
            ) : null}
          </Popup>
        ) : null}
      </Map>
    </Box>
  );
};

export default WorldMap;
