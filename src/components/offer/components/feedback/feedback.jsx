const Feedback = (props) => {
  const {feedback} = props;

  const date = new Date(props.feedback.date);

  const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={feedback.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {feedback.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: feedback.rating * 4 + `94%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {feedback.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{months[date.getMonth() - 1] + ` ` + date.getFullYear()}</time>
    </div>
  </li>;
};

Feedback.propTypes = {
  feedback: PropTypes.object.isRequired
};

export default Feedback;
