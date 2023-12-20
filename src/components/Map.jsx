import {
  MapContainer,
  Popup,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  // const { id } = useParams();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation({
    defaultPosition: [40, 0],
  });
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([parseFloat(lat), parseFloat(lng)]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "USE YOUR POSITION"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DeteckClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  // map.setView(position);
  useEffect(() => {
    if (
      position &&
      position.length === 2 &&
      !isNaN(position[0]) &&
      !isNaN(position[1])
    ) {
      map.setView(position);
    }
  }, [map, position]);

  return null;
}

function DeteckClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
        replace: true,
      });
    },
  });
}

export default Map;
