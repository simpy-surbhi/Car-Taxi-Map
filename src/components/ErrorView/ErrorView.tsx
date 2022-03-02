import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import * as React from "react";
import { ErrorContent } from "./ErrorContent";

interface Props {
  error: Error;
  helpMsg?: string;
  dialogProps?: DialogProps;
}

export const ErrorView: React.FC<Props> = ({ dialogProps, ...rest }) => {
  if (!dialogProps) {
    return <ErrorContent {...rest} />;
  }

  const { open, onClose } = dialogProps;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>

      <DialogContent>
        <ErrorContent {...rest} />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {}} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
