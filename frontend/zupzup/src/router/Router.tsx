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
          <Route
            path={utils.URL.FLOGGING.LOBBY}
            element={<pages.FloggingStart />}
          />
          <Route path={utils.URL.FLOGGING.CAMERA} element={<pages.Camera />} />
          <Route path={utils.URL.FLOGGING.ON} element={<pages.OnFlogging />} />
          <Route
            path={utils.URL.FLOGGING.TRASH}
            element={<pages.TrashReport />}
          />

          <Route path={utils.URL.LOGIN.HOME} element={<pages.Login />} />

          <Route
            path={utils.URL.LOGIN.REGIST_INFO + '/physical'}
            element={<pages.RegistInfoPhysical />}
          />
          <Route
            path={utils.URL.LOGIN.REGIST_INFO + '/profile'}
            element={<pages.RegistInfoProfile />}
          />

          <Route
            path={utils.URL.RESULT.REGIST}
            element={<pages.RegistSuccess />}
          />
          <Route
            path={utils.URL.RESULT.FLOGGING}
            element={<pages.FloggingDone />}
          />
          <Route path={utils.URL.LOADING} element={<pages.Loading />} />

          <Route path={utils.URL.MYPAGE.HOME} element={<pages.MyPage />} />
          <Route path="*" element={<pages.Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
