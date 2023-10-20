import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as pages from "pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<pages.OnBoarding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
