import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { toastDisplayState } from '../recoil/toastDisplayState';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Search from '../pages/Search';
import ProductInfo from '../pages/ProductInfo';
import Checkout from '../pages/Checkout';
import AccountInfo from '../pages/AccountInfo';
import AdminLogin from '../pages/AdminLogin';
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

const queryClient = new QueryClient();

function App() {
  const toastDisplay = useRecoilValue(toastDisplayState);

  return (
    <Router>
      <ScrollToTop />

      <QueryClientProvider client={queryClient}>
      <Header />

      <Switch>
        <Route path='/' exact component={Home} />
        <PrivateRoute path='/cart' component={Cart} redirect='/' />
        <Route path='/category/:category/:type?' component={Search} />
        <Route path='/search' component={Search} />
        <Route path='/product/:id' component={ProductInfo} />
        <PrivateRoute path='/checkout' component={Checkout} redirect='/' />
        <PrivateRoute path='/account' component={AccountInfo} redirect='/' />
        <Route path='/admin/login' component={AdminLogin} />
        <AdminRoute path='/admin' component={Dashboard} redirect='/admin/login' />
      </Switch>

      <Footer />
      <Messenger />
      <ResultMessage />
      <Dialog />
      {toastDisplay.show && <ToastMessage />}
      </QueryClientProvider>
    </Router>
  );
}

export default App;
