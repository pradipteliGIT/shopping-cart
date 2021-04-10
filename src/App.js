import { Switch, Route } from 'react-router-dom';
import './default.scss';
// Layouts
import HomePageLayout from './layouts/HomePageLayout';
import MainPageLayout from './layouts/MainPageLayout';
// Pages
import HomePage from './pages/HomePage/HomePage';
import Registration from './pages/Registration/Registration';

function App() {
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
      </Switch>
    </div>
  );
}

export default App;
