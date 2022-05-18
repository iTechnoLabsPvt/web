import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as Containers from "./App/Containers";

import "./App/Stylesheets/main.css";
import "./App/style.css";
import "./App/media.css";

import * as Layouts from "./App/Layouts";

import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { createBrowserHistory } from "history";
import ConnectedIntlProviderForFrontLayout from "./ConnectedIntlProviderForFrontLayout";

export const history = createBrowserHistory(); //check it by passing base url of app if it does not work

const { persistor, store } = configureStore(history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedIntlProviderForFrontLayout>
            <Router>
              <Switch>
                <Layouts.Route
                  exact
                  path="/"
                  component={Containers.Home}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/test"
                  component={Containers.Test}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/about-us"
                  component={Containers.AboutUs}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/signup"
                  component={Containers.Signup}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/login"
                  component={Containers.Login}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/email-verify"
                  component={Containers.VerifyEmail}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/reset-password"
                  component={Containers.ResetPassword}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/products/category/"
                  component={Containers.CategoryWiseProducts}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/wishlist"
                  component={Containers.Wishlist}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/cart"
                  component={Containers.Cart}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/products/all"
                  component={Containers.Products}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/product-detail/:product_id"
                  component={Containers.ProductDetail}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/dashboard"
                  component={Containers.Dashboard}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/profile"
                  component={Containers.Profile}
                  type="private"
                />
                <Layouts.Route
                  exact
                  path="/orders"
                  component={Containers.Orders}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/re-order"
                  component={Containers.ReOrders}
                  type="private"
                />
                <Layouts.Route
                  exact
                  path="/art-work"
                  component={Containers.ArtWorkFiles}
                  type="private"
                />
                <Layouts.Route
                  exact
                  path="/card-details"
                  component={Containers.CheckoutForm}
                  type="private"
                />
                <Layouts.Route
                  exact
                  path="/my-mockups"
                  component={Containers.Mockups}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/product-detail/edit/:product_id"
                  component={Containers.ProductDetail}
                  type="private_non_private"
                />
                <Layouts.Route
                  exact
                  path="/faq"
                  component={Containers.Faq}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/privacy-policy"
                  component={Containers.PrivacyPolicy}
                  type="non_private"
                />
                <Layouts.Route
                  exact
                  path="/term-and-conditions"
                  component={Containers.TermAndConditions}
                  type="non_private"
                />

                <Layouts.Route
                  exact
                  path="/cookie-policy"
                  component={Containers.CookiePolicy}
                  type="non_private"
                />

                <Layouts.Route
                  exact
                  path="/copyrights-policy"
                  component={Containers.CopyrightsPolicy}
                  type="non_private"
                />

                <Layouts.Route
                  exact
                  path="/shipping-returns-refunds"
                  component={Containers.ShippingReturnsRefunds}
                  type="non_private"
                />
  <Layouts.Route
                  exact
                  path="/order-detail/:order_id"
                  component={Containers.OrderDetail}
                  type="private_non_private"
                />
                {/* 404 */}
                 {/* <Route exact
                  path="/" component={Containers.Maintance} />  */}
              </Switch>
            </Router>
          </ConnectedIntlProviderForFrontLayout>
        </PersistGate>
      </Provider>
    );
  }
}
