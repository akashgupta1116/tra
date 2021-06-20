import React, { Suspense } from "react";
import CustomerTable from "./components/CustomerTable";
import BidData from "./components/BidData";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>...loading </div>}>
        <Router>
          <Switch>
            <Route path="/bids/:id" component={BidData} />
            <Route exact path="/">
              <CustomerTable />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}
