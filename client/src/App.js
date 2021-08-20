import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import SignUp from "./pages/signup-form";

function App() {
  return (
    <Router>
      <div>
        {window.location.pathname !== "/" && <Header />}
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
