import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
  useLocationFound,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useFeedContext } from "../context/FeedContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// const myMap = L.map('map', {zoomControl: false}).locate({setView: true, maxZoom: 16});

// var marker;

// function onLocationFound(e) { // define a function to handle the locationfound event
//   if (!marker) { // if the marker is not created yet
//     marker = L.marker(e.latlng); // create a marker at the current location
//     marker.addTo(myMap); // add the marker to the map
//   } else { // if the marker already exists
//     marker.setLatLng(e.latlng); // update the marker position
//   }
// }

// myMap.on('locationfound', onLocationFound);

let initPosition = [51.505, -0.15];

function LocationMarker({ setFormData, currentData }) {
  const currentCoordinates = JSON.parse(currentData?.coordinates);
  console.log(currentCoordinates);

  const [position, setPosition] = useState([currentCoordinates[0], currentCoordinates[1]] || null);
  // const map = useMapEvents({
  //     click() {
  //         map.locate();
  //     },
  //     locationfound(e) {
  //         setPosition(e.latlng)
  //         map.flyTo(e.latlng, map.getZoom())
  //     },
  // })

  console.log(position);
  const map = useMap(); // use the useMap hook to access the map instance
  
  // console.log(JSON.parse(currentData.coordinates));
  // initPosition = [currentCoordinates?.lat, currentCoordinates?.lng];

  useMapEvents({
    // use the useMapEvents hook to handle map events
    // mouseover() {
    //   map.locate();
    // },
    click(e) {
      setPosition(e.latlng);

      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }));
      }
    },
    locationfound(e) {
      // handle the location found event
      setPosition(e.latlng); // update the marker position state
      // map.flyTo(e.latlng, map.getZoom()); // center the map on the current location
      map.setView(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  useEffect(() => {
    map.setView(position || initPosition, map.getZoom());
  }, [position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// // return marker location cordinates
// const Markers = () => {
//   const marker = "";
//   const map = useMapEvents({
//     click(e) {
//       const newMarker = e.latlng;
//       marker = newMarker;
//     },
//   });

//   return <Marker position={marker}></Marker>;
// };

const WebMap = ({ height, currentData, setFormData}) => {
  return (
    <MapContainer
      center={initPosition}
      zoom={13}
      scrollWheelZoom={true}
      whenReady={() => {}}
      style={{ height, width: "100%", borderRadius: "5px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker setFormData={setFormData} currentData={ currentData }/>
    </MapContainer>
  );
};

export default WebMap;
