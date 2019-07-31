import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// Import Routes
import PrivateRoutes from "./components/Private/PrivateRoutes";
import PublicRoutes from "./components/Public/PublicRoutes";
// Components
import Navbar from "./components/Common/Navbar/Navbar";
import Footer from "./components/Common/Footer/Footer";
// Scroll To Top FIX
import ScrollToTop from "./components/Common/ScrollToTop";
// Store
import store from "./store";
// Utilities
import checkToken from "./utils/checkToken";

const App = () => {
  checkToken(store);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path="/dashboard" component={PrivateRoutes} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
