import { Position } from "./Position";

export interface VehicleFree {
  id: number;
  coordinate: Position;
  state: string;
  type: string;
}
