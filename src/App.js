import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './default.scss';
// HOC
import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/WithAdminAuth';
// Layouts
import HomePageLayout from './layouts/HomePageLayout';
import MainPageLayout from './layouts/MainPageLayout';
// Pages
import HomePage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
// Actions
import { checkUserSession } from './redux/User/user.actions';
import AdminToolBar from './components/AdminToolBar/AdminToolBar';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainPageLayout>
              <Registration />
            </MainPageLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainPageLayout>
              <Login />
            </MainPageLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainPageLayout>
              <Recovery />
            </MainPageLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainPageLayout>
                <Dashboard />
              </MainPageLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <MainPageLayout>
                <Admin />
              </MainPageLayout>
            </WithAdminAuth>
          )}
        />
        <Route
          render={() => (
            <MainPageLayout>
              <PageNotFound />
            </MainPageLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
