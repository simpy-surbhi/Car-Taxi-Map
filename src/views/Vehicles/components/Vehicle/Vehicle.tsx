import {
  Card,
  Tooltip,
  CardContent,
  ListItem,
  CardMedia,
  List,
  ListItemText,
  ListSubheader,
  IconButton,
  ListItemIcon,
  CardActions,
  ListItemSecondaryAction,
  CardHeader,
  Collapse,
  Avatar,
  useTheme,
} from "@material-ui/core";

import {
  LocalTaxi,
  CheckCircle,
  ExpandMore,
  MoodBad,
  InsertEmoticon,
  FiberManualRecord,
  Info,
  Room,
  LocalGasStation,
} from "@material-ui/icons";
import clsx from "clsx";

import { VehicleFree, VehicleShare } from "../../../../models";
import * as React from "react";
import { useStyles } from "./styles";
import freeLogo from "../../../../layouts/App/assets/a1.png";
import shareLogo from "../../../../layouts/App/assets/a2.jpg";

interface Props {
  free?: VehicleFree;
  share?: VehicleShare;
  setSelectedPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
}

enum CarState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum Quality {
  GOOD = "GOOD",
  UNACCEPTABLE = "UNACCEPTABLE",
}

export const Vehicle: React.FC<Props> = ({
  free,
  share,
  setSelectedPosition,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              style={{
                backgroundColor: free
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              }}
            >
              <LocalTaxi />
            </Avatar>
          }
          action={
            <Tooltip title="Click to find location in map">
              <IconButton
                aria-label="selection"
                onClick={() => {
                  setSelectedPosition(
                    free
                      ? [free.coordinate.latitude, free.coordinate.longitude]
                      : [share?.coordinates[1] ?? 0, share?.coordinates[0] ?? 0]
                  );
                }}
              >
                <Room />
              </IconButton>
            </Tooltip>
          }
          title={free ? "Free Taxi" : "Share Taxi"}
        />
        <CardMedia
          className={classes.media}
          image={free ? freeLogo : shareLogo}
        />
        <CardActions disableSpacing>
          {free && (
            <Tooltip title={free.type + " state: " + free.state}>
              <CheckCircle
                style={{
                  color:
                    free.state === CarState.ACTIVE
                      ? theme.palette.success.main
                      : theme.palette.error.light,
                }}
              />
            </Tooltip>
          )}

          {share && (
            <React.Fragment>
              <Tooltip
                title={
                  <React.Fragment>
                    Name is {share.name} <br />
                    VIN is {share.vin} <br />
                    Enginer type is {share.engineType}
                  </React.Fragment>
                }
              >
                <Info color="secondary" />
              </Tooltip>
              <Tooltip title={"Fuel level is " + share.fuel}>
                <LocalGasStation color="secondary" />
              </Tooltip>
            </React.Fragment>
          )}

          <IconButton
            style={{ textAlign: "right" }}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {free && (
              <List subheader={<ListSubheader>Details</ListSubheader>}>
                <ListItem dense>
                  <ListItemIcon>
                    <LocalTaxi />
                  </ListItemIcon>
                  <ListItemText primary="Type" />
                  <ListItemSecondaryAction>
                    {free ? free.type : ""}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="State" />
                  <ListItemSecondaryAction>
                    {free ? free.state : ""}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            )}

            {share && (
              <List subheader={<ListSubheader>Details</ListSubheader>}>
                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="Name" />
                  <ListItemSecondaryAction>
                    {share.name}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="Engine Type" />
                  <ListItemSecondaryAction>
                    {share.engineType}
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="VIN" />
                  <ListItemSecondaryAction>{share.vin}</ListItemSecondaryAction>
                </ListItem>

                <ListItem dense>
                  <ListItemIcon>
                    <LocalGasStation />
                  </ListItemIcon>
                  <ListItemText primary="Fuel" />
                  <ListItemSecondaryAction>
                    {share.fuel}
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="Exterior" />
                  <Tooltip title={share.exterior}>
                    <ListItemSecondaryAction>
                      {share.exterior === Quality.GOOD ? (
                        <InsertEmoticon />
                      ) : share.exterior === Quality.UNACCEPTABLE ? (
                        <MoodBad />
                      ) : (
                        ""
                      )}
                    </ListItemSecondaryAction>
                  </Tooltip>
                </ListItem>

                <ListItem dense>
                  <ListItemIcon>
                    <FiberManualRecord />
                  </ListItemIcon>
                  <ListItemText primary="Interior" />
                  <Tooltip title={share.interior}>
                    <ListItemSecondaryAction>
                      {share.interior === Quality.GOOD ? (
                        <InsertEmoticon />
                      ) : share.interior === Quality.UNACCEPTABLE ? (
                        <MoodBad />
                      ) : (
                        ""
                      )}
                    </ListItemSecondaryAction>
                  </Tooltip>
                </ListItem>

                <ListItem dense>
                  <ListItemIcon>
                    <Room />
                  </ListItemIcon>
                  <ListItemText primary="Address" />
                  <Tooltip title={share.address}>
                    <ListItemSecondaryAction>
                      {share.address.substring(0, 20) + "..."}
                    </ListItemSecondaryAction>
                  </Tooltip>
                </ListItem>
              </List>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
};
