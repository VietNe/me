import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Div from "~components/Div";
import Loader from "~components/Loader";
import AnimationLifecycle from "~containers/AnimationLifecycle";
import ProjectDetailsPage from "./ProjectDetailsPage";

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
                    path='/project/:projectSlug'
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
