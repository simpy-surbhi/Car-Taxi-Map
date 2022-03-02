import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import {
  ListItem,
  List,
  ListItemText,
  useTheme,
  Tooltip,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Room, LocalGasStation } from "@material-ui/icons";
import { VehicleFree, VehicleShare } from "../../../../models";
import * as React from "react";
import { useStyles } from "./styles";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import freeIcon from "../../../../layouts/App/assets/l1.jpg";
import shareIcon from "../../../../layouts/App/assets/l2.jpg";

interface Props {
  freeVehicles?: VehicleFree[];
  shareVehicles?: VehicleShare[];
  selectedPosition: [number, number];
}

export const LocationMap: React.FC<Props> = ({
  freeVehicles,
  shareVehicles,
  selectedPosition,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  function SetViewOnClick() {
    const map = useMap();
    if (selectedPosition[0] === 0) {
      map.setView(position, 14);
      return null;
    }
    map.setView(selectedPosition[0] === 0 ? position : selectedPosition, 24);
    return (
      <CircleMarker
        center={selectedPosition}
        color={theme.palette.common.black}
      ></CircleMarker>
    );
  }

  const freeIconDetails = L.icon({
    iconUrl: freeIcon,
    iconSize: [50, 48],
    iconAnchor: [25, 40],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  const shareIconDetails = L.icon({
    iconUrl: shareIcon,
    iconSize: [50, 48], // size of the icon
    iconAnchor: [25, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const freeMarkers = () => {
    return freeVehicles?.map((m, index) => {
      return (
        <Marker
          position={[m.coordinate.latitude, m.coordinate.longitude]}
          key={"free" + index}
          icon={freeIconDetails}
          riseOnHover
        >
          <Popup>
            Fee Taxi
            <List className={classes.list}>
              <ListItem dense>
                <ListItemText primary="Type" />
                <ListItemSecondaryAction>{m.type}</ListItemSecondaryAction>
              </ListItem>
              <ListItem dense>
                <ListItemText primary="State" />
                <ListItemSecondaryAction>{m.state}</ListItemSecondaryAction>
              </ListItem>
            </List>
          </Popup>
        </Marker>
      );
    });
  };

  const shareMarkers = () => {
    return shareVehicles?.map((m, index) => {
      return (
        <Marker
          position={[m.coordinates[1], m.coordinates[0]]}
          key={"share" + index}
          icon={shareIconDetails}
          riseOnHover
        >
          <Popup>
            Share Taxi
            <List className={classes.list}>
              <ListItem dense>
                <ListItemText primary="Name" />
                <ListItemSecondaryAction>{m.name}</ListItemSecondaryAction>
              </ListItem>

              <ListItem dense>
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="Fuel" />
                <ListItemSecondaryAction>{m.fuel}</ListItemSecondaryAction>
              </ListItem>

              <ListItem dense>
                <ListItemIcon>
                  <Room />
                </ListItemIcon>
                <ListItemText primary="Address" />
                <Tooltip title={m.address}>
                  <ListItemSecondaryAction>
                    {m.address.substring(0, 5) + "..."}
                  </ListItemSecondaryAction>
                </Tooltip>
              </ListItem>
            </List>
          </Popup>
        </Marker>
      );
    });
  };

  const position = new L.LatLng(53.5532316, 10.0087783);
  return (
    <React.Fragment>
      <MapContainer
        center={selectedPosition[0] === 0 ? position : selectedPosition}
        zoom={14}
        className={classes.mapContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {freeMarkers()}
        {shareMarkers()}
        <SetViewOnClick />
      </MapContainer>
    </React.Fragment>
  );
};
