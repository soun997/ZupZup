import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as pages from 'pages';
import * as utils from 'utils';
import { Layout } from 'components';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={utils.URL.MAIN.HOME} element={<Layout />}>
          <Route path="/" element={<pages.OnBoarding />} />
          <Route
            path={utils.URL.CALENDAR.CALENDAR}
            element={<pages.FloggingRecord />}
          />
          <Route path={utils.URL.FLOGGING.LOBBY} element={<pages.Flogging />} />
          <Route path={utils.URL.LOGIN.HOME} element={<pages.Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
