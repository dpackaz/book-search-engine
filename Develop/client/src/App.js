import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  cache: new InMemoryCache(),
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Navbar />
          <Route exact path="/" element={<SearchBooks />} />
          <Route exact path="/saved" element={<SavedBooks />} />
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
