import { SvgIcon } from "@material-ui/core";
import { Commute } from "@material-ui/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
import * as React from "react";
import { RouteProps } from "react-router-dom";
import { Dashboard, VehicleContainer } from "../../views";

interface SubPage {
  path: string;
  headerTitle: string;
  icon: typeof SvgIcon;
  searchTitle: string;
}

// Children not supported by AppLayout
export interface AppRouteProps extends Omit<RouteProps, "children"> {
  path: string;
  headerTitle: string;
  sidebarName?: React.ReactNode;
  icon: typeof SvgIcon;
  subPages?: SubPage[];
}

export function getRoutes() {
  const routes: AppRouteProps[] = [
    {
      path: "/dashboard",
      headerTitle: "Dashboard",
      icon: DashboardIcon,
      component: Dashboard,
    },
    {
      path: "/vehicle",
      headerTitle: "Vehicles",
      icon: Commute,
      component: VehicleContainer,
    },
  ];
  return routes;
}
