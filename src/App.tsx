import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@Pages/HomePage';
import SingleDevicePage from '@Pages/SinglePage';
import SelectPlayerTypePage from '@Pages/SelectPlayerTypePage';
import { ROUTE_PATH } from './configure/constant';
import EndPage from '@Pages/EndPage';
import DonatePage from '@Pages/DonatePage';
import SingleChangePlayerTypePage from '@Pages/ChangePlayerTypePage/SingleGameFetchContainer';
import MultiChangePlayerTypePage from '@Pages/ChangePlayerTypePage/MultiGameFetchContainer';
import MultiDevicePage from '@Pages/MultiPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from '@Layouts/RootLayout';
import MultiRoom from '@Pages/MultiRoom';
import SingleGameAnswerPage from '@Pages/AnswerPage/SingleGameAnswerPage';
import FetchMultiGameAnswerPage from '@Pages/AnswerPage/FetchMultiGameAnswerPage';
import CategorySelectPage from '@Pages/CategorySelectPage';
import NotFoundPage from 'src/NotFoundPage';

const singleRoute = `${ROUTE_PATH.SINGLE_PAGE}/:gameId/:questionIndex`;
const multiRoute = `${ROUTE_PATH.MULTI_PAGE}/:gameId/:questionIndex`;

const App = () => {
  return (
    <>
      <ToastContainer />
      <RootLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={`${ROUTE_PATH.SINGLE_PAGE}`} element={<SingleDevicePage />} />
          <Route path={ROUTE_PATH.MULTI_PAGE} element={<MultiDevicePage />} />

          <Route
            path={`${ROUTE_PATH.SINGLE_PAGE}${ROUTE_PATH.ANSWER_SELECT}`}
            element={<SelectPlayerTypePage />}
          />
          <Route path={`${multiRoute}${ROUTE_PATH.MULTI_ROOM}`} element={<MultiRoom />} />

          <Route
            path={`${singleRoute}${ROUTE_PATH.ANSWER_PAGE}`}
            element={<SingleGameAnswerPage />}
          />
          <Route
            path={`${multiRoute}${ROUTE_PATH.ANSWER_PAGE}`}
            element={<FetchMultiGameAnswerPage />}
          />

          <Route
            path={`${singleRoute}${ROUTE_PATH.BM_PAGE}`}
            element={<SingleChangePlayerTypePage />}
          />

          <Route
            path={`${multiRoute}${ROUTE_PATH.BM_PAGE}`}
            element={<MultiChangePlayerTypePage />}
          />

          <Route path={`${singleRoute}${ROUTE_PATH.DONATE_PAGE}`} element={<DonatePage />} />
          <Route path={`${multiRoute}${ROUTE_PATH.DONATE_PAGE}`} element={<DonatePage />} />
          <Route path={`${ROUTE_PATH.category}`} element={<CategorySelectPage />} />

          <Route path={`${ROUTE_PATH.END_PAGE}`} element={<EndPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </>
  );
};

export default App;
