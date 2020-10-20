import React from 'react';
import Gallery from './pages/gallery';
import PhoneDetails from './pages/phone_details';
import NotFound from './pages/not_found';
import Header from './components/header';
import Footer from './components/footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <Redirect to="/phones" /> 
              )
            }}
          />
          <Route exact path="/phones">
            <Gallery />
          </Route>
          <Route path="/phones/details/:id">
            <PhoneDetails />
          </Route>
          <Route path='*' exact>
            <NotFound />
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
