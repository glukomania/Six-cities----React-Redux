import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen.connect';
import Offer from '../offer/offer';
import Login from '../login/login';
import Favorites from '../favorites-list/favorites-list';

const App = (props) => {
  const {isLoading, allOffers, isAuthorized} = props;

  if (allOffers.length === 0) {
    props.loadOffers();
    if (isAuthorized) {
      props.loadFavorites();
    }
  }

  return allOffers.length === 0 ? null : <Router>
    <Switch>
      <Route path="/" exact component={(isLoading || allOffers.length === 0) ? <div style={{textAlign: `center`, fontSize: `70px`, padding: `100px 60px`, color: `#ffffff`}}>Page is loading...</div> : MainScreen} />;
      <Route path='/login' exact component={Login} />;
      <Route path='/favorites' exact component={isAuthorized ? Favorites : Login} />;
      <Route path='/offer/:id' exact render={(offerProps) => <Offer {...offerProps}/>} />;
      <Route render={() => <div style={{textAlign: `center`, fontSize: `70px`, padding: `100px 60px`, color: `#ffffff`}}>Page not found</div>} />
    </Switch>
  </Router>;
};

App.propTypes = {
  allOffers: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  currentCity: PropTypes.string.isRequired,
  loadOffers: PropTypes.func,
  isAuthorized: PropTypes.bool.isRequired,
  loadFavorites: PropTypes.func.isRequired
};

export default App;
