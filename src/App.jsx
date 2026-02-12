import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./components/Layout/index.jsx";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        {publicRoutes.map((route, idx) => {
          const Page = route.component;
          const Layout =
            route.layout === null ? Fragment : route.layout || DefaultLayout;

          return (
            <Route
              key={`pub-${idx}`}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {/* PRIVATE */}

        <Route element={<PrivateRoute />}>
          {privateRoutes.map((route, idx) => {
            const Page = route.component;
            const Layout =
              route.layout === null ? Fragment : route.layout || DefaultLayout;

            return (
              <Route
                key={`pri-${idx}`}
                element={<PrivateRoute allowedRoles={route.roles} />}
              >
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
