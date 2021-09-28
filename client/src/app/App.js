import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import ScrollToTop from '../helpers/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
