import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import './default.scss';
// Layouts
import HomePageLayout from './layouts/HomePageLayout';
import MainPageLayout from './layouts/MainPageLayout';
// Pages
import HomePage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';

const initialState = null;
function App() {
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = React.useState(initialState);
  let authListener = null;
  React.useEffect(() => {
    authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // calling utility to update data in db
        const useRef = await handleUserProfile(userAuth);

        useRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(initialState);
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
            <HomePageLayout currentUser={currentUser}>
              <HomePage />
            </HomePageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainPageLayout currentUser={currentUser}>
                <Registration />
              </MainPageLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainPageLayout currentUser={currentUser}>
                <Login />
              </MainPageLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainPageLayout currentUser={currentUser}>
              <Recovery />
            </MainPageLayout>
          )}
        />
        <Route
          render={() => (
            <MainPageLayout currentUser={currentUser}>
              <PageNotFound />
            </MainPageLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
