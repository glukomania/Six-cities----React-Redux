import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ActionCreator} from '../../store/reducer';
import {connect} from 'react-redux';


const Card = (props) => {
  const {id, isPremium, title, images, price, rating, type, onOfferOver, onOfferClick} = props;

  const setAddress = () => {
    return `/offer/${id}`;
  };

  return <article className="cities__place-card place-card" onMouseOver={() => {
    onOfferOver(title);
  }}>
    {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={setAddress()} onClick={() => onOfferClick(id)}>
        <img className="place-card__image" src={images[1]} width="260" height="200" alt="Place image" />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: rating + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={setAddress()} className="place-card_title">{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onOfferClick: PropTypes.func,
  onOfferOver: PropTypes.func,
  isPremium: PropTypes.bool.isRequired
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  onOfferClick: state.onOfferClick,
});

const mapDispatchToProps = (dispatch) => ({
  onOfferClick: (value) => {
    dispatch(ActionCreator.getFeedbacks(value));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Card);
