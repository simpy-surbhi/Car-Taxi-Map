import {
  Grid,
  Paper,
  Toolbar,
  ButtonGroup,
  Button,
  InputBase,
  AppBar,
  IconButton,
} from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import { DelayedLinearProgress } from "../../components/";
import { FreeNow, ShareNow } from "../../models";
import { Vehicle, LocationMap } from "./components";
import { useApiClient } from "../../hooks";
import * as React from "react";
import { useStyles } from "./styles";

enum FilterType {
  ALL = "ALL",
  FREE = "FREE",
  SHARE = "SHARE",
}
export const VehicleContainer: React.FC = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState<string>("");
  const [selectedPosition, setSelectedPosition] = React.useState<
    [number, number]
  >([0, 0]);

  const [{ data: freeVehiclesData, loading: freeLoading }] = useApiClient<
    FreeNow
  >(`free-now/vehicles`);
  const [{ data: shareVehiclesData, loading: shareLoading }] = useApiClient<
    ShareNow
  >(`share-now/vehicles`);
  const [filter, setFilter] = React.useState<FilterType>(FilterType.ALL);

  const shareFilteredVehicles = shareVehiclesData?.placemarks.filter(
    (m) =>
      m.name.toLocaleLowerCase().indexOf(searchText) !== -1 ||
      m.vin.toLocaleLowerCase().indexOf(searchText) !== -1 ||
      m.address.toLocaleLowerCase().indexOf(searchText) !== -1
  );

  const freeFilteredVehicles = freeVehiclesData?.poiList.filter(
    (m) => m.type.toLocaleLowerCase().indexOf(searchText) !== -1
  );

  React.useEffect(() => {
    setSearchText("");
    setSelectedPosition([0, 0]);
  }, [filter]);

  React.useEffect(() => {
    setSelectedPosition([0, 0]);
  }, [searchText]);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        {(freeLoading || shareLoading) && <DelayedLinearProgress />}

        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar className={classes.applicationsToolbar}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    if (searchText && searchText.length !== 0) {
                      setSearchText("");
                    }
                  }}
                >
                  {searchText && searchText.length !== 0 ? (
                    <Close />
                  ) : (
                    <Search />
                  )}
                </IconButton>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                fullWidth
                value={searchText}
                onChange={(e) => {
                  setSearchText((e.target.value as string).toLowerCase());
                }}
                autoFocus
              />
            </div>
            <div>
              Display count:
              {(freeFilteredVehicles && filter !== FilterType.SHARE
                ? freeFilteredVehicles.length
                : 0) +
                (shareFilteredVehicles && filter !== FilterType.FREE
                  ? shareFilteredVehicles.length
                  : 0)}
            </div>
            <div>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
              >
                <Button
                  color={filter === FilterType.ALL ? "secondary" : "primary"}
                  onClick={() => setFilter(FilterType.ALL)}
                >
                  All
                </Button>
                <Button
                  onClick={() => setFilter(FilterType.FREE)}
                  color={filter === FilterType.FREE ? "secondary" : "primary"}
                >
                  Free
                </Button>
                <Button
                  onClick={() => setFilter(FilterType.SHARE)}
                  color={filter === FilterType.SHARE ? "secondary" : "primary"}
                >
                  Share
                </Button>
              </ButtonGroup>
            </div>
          </Toolbar>
        </AppBar>
      </Paper>

      <Grid container>
        <Grid item xs={12} md={4}>
          <Grid container className={classes.grid}>
            {filter !== FilterType.FREE &&
              shareFilteredVehicles?.map((m, index) => {
                return (
                  <Grid item xs={12} key={"share" + index}>
                    <Vehicle
                      share={m}
                      setSelectedPosition={setSelectedPosition}
                    />
                  </Grid>
                );
              })}
            {filter !== FilterType.SHARE &&
              freeFilteredVehicles?.map((m, index) => {
                return (
                  <Grid item xs={12} key={"free" + index}>
                    <Vehicle
                      free={m}
                      setSelectedPosition={setSelectedPosition}
                    />
                  </Grid>
                );
              })}
            {(!freeFilteredVehicles || freeFilteredVehicles?.length === 0) &&
              (!shareFilteredVehicles ||
                shareFilteredVehicles?.length === 0) && (
                <div>No data found. </div>
              )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <LocationMap
            selectedPosition={selectedPosition}
            freeVehicles={
              filter !== FilterType.SHARE ? freeFilteredVehicles : undefined
            }
            shareVehicles={
              filter !== FilterType.FREE ? shareFilteredVehicles : undefined
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
