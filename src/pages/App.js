import React, { Suspense } from "react";
import Div from "~components/Div";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landing = React.lazy(() => import("./Landing"));

const App = () => {
  return (
    <Div className='h-screen w-screen bg-pw-grey'>
      <Router>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/'>
              <Landing />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Div>
  );
};

export default App;
