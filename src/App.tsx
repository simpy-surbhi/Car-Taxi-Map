import { CssBaseline } from "@material-ui/core";
import { AppTheme } from "./App.theme";
import { ErrorView } from "./components";
import * as React from "react";
import { AppLayout } from "./layouts/App/AppLayout";
import { BrowserRouter } from "react-router-dom";

interface Props {}

interface State {
  error?: Error;
}

export default class App extends React.Component<Props, State> {
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render() {
    const { error } = this.state;

    if (error) {
      return <ErrorView error={error} />;
    }

    return (
      <AppTheme>
        <CssBaseline />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AppTheme>
    );
  }
}
