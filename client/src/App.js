import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import SignUp from "./pages/signup-form";
import Login from "./pages/login";

// const theme = createTheme({
//   palette: {
//     primary: "E94F37",
//   },
//   spacing: 8,
// });

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
