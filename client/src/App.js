import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import SignUp from "./pages/signup-form";
import Login from "./pages/login";
import Feed from "./pages/Feed";
import Profile from "./pages/profile";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#E94F37",
    },
    secondary: {
      main: "#F5F100",
    },
    background: {
      paper: "#393E41",
      default: "#393E41",
    },
    text: {
      primary: "#F6F7EB",
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:id?" component={Profile} />
            <Route exact path="/feed" component={Feed} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
