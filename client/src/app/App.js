import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Search from '../pages/Search';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import AccountInfo from '../pages/AccountInfo';
import AdminAuthentication from '../pages/AdminAuthentication';
import Dashboard from '../pages/Dashboard';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import Messenger from '../shared/Messenger';
import ResultMessage from '../shared/notifications/ResultMessage';
import Dialog from '../shared/notifications/Dialog';
import ToastMessage from '../shared/notifications/ToastMessage';
import ScrollToTop from '../helpers/ScrollToTop';
import PrivateRoute from '../helpers/PrivateRoute';
import AdminRoute from '../helpers/AdminRoute';

function App() {
  // const toastDisplay = useRecoilValue(toastDisplayState);
  // const user = useRecoilValue(userState);

  const isLogged = () => {
    // if (user.accessToken) return true;
    return false;
  }

  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/category/:category' component={Search} />
        <Route path='/search' component={Search} />
        <Route path='/product/:id' component={ProductDetail} />
        <PrivateRoute path='/checkout' component={Checkout} redirect='/' auth={isLogged} />
        <PrivateRoute path='/account' component={AccountInfo} redirect='/' auth={isLogged} />
        <Route path='/admin/login' component={AdminAuthentication} />
        <AdminRoute path='/admin' component={Dashboard} redirect='/admin/login' />
      </Switch>

      <Footer />
      {/* <Messenger /> */}
      {/* <ResultMessage /> */}
      {/* <Dialog /> */}
      {/* {toastDisplay.show && <ToastMessage />} */}
    </Router>
  );
}

export default App;
