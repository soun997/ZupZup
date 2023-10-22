import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as pages from "pages";
import * as utils from "utils";
import * as components from "components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={utils.URL.MAIN.HOME} element={<components.Layout />}>
          <Route path="/" element={<pages.OnBoarding />} />
          <Route
            path={utils.URL.CALENDAR.CALENDAR}
            element={<pages.Calendar />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
