import Header from './components/Header/Header';
import './default.scss';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
