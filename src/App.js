import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';
// HOC
import WithAuth from './hoc/WithAuth';
// Actions
import { setCurrentUser } from './redux/User/user.actions';
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

function App(props) {
  React.useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // calling utility to update data in db
        const useRef = await handleUserProfile(userAuth);
        useRef.onSnapshot(snapshot => {
          props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        props.setCurrentUser(userAuth);
      }
    });
    return () => {
      // unsubscribes event listener
      authListener();
    };
  }, []);
  return (
    <div className="App">
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
App.propTypes = {
  setCurrentUser: PropTypes.func,
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
