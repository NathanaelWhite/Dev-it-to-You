import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
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

// const theme = createTheme({
//   palette: {
//     primary: "E94F37",
//   },
//   spacing: 8,
// });

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
