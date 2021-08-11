import React, { Suspense, useState } from "react";
import Div from "~components/Div";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "~components/Loader";

import ProjectDetailsPage from "./ProjectDetailsPage";
import AnimationLifecycle from "~containers/AnimationLifecycle";
const Landing = React.lazy(() => import("./Landing"));

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Div className='h-screen w-screen bg-pw-grey'>
      <Router>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/'>
              {loading ? (
                <Loader finishLoading={() => setLoading(false)} />
              ) : (
                <>
                  <Landing />
                  <Route
                    exact
                    path='/project/:projectSlug?'
                    children={(props) => (
                      <AnimationLifecycle
                        component={ProjectDetailsPage}
                        whenToRender={(match) =>
                          match && match.params && match.params.projectSlug
                        }
                        {...props}
                      />
                    )}
                  />
                </>
              )}
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Div>
  );
};

export default App;
