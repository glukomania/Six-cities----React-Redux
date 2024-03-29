const INITIAL_CITY = `Amsterdam`;

export const initialState = {
  currentCity: INITIAL_CITY,
  allOffers: [],
  isLoading: true,
  isAuthorized: false,
  email: undefined,
  feedbacks: null,
  currentOffers: [],
  isChanged: false,
  userCredentials: {},
  favorites: [],
  activeCardCoords: []
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  loadOffers: (offers) => {
    return {
      type: `LOAD_OFFERS`,
      payload: {
        offers,
        isLoading: false
      }
    };
  },

  authorize: (value) => ({
    type: `AUTHORIZE`,
    payload: value,
  }),

  setEmail: (value) => ({
    type: `SET_EMAIL`,
    payload: value
  }),

  getFeedbacks: (value) =>({
    type: `GET_FEEDBACKS`,
    payload: value
  }),

  setSortedOffers: (value) => ({
    type: `SET_SORTED_OFFERS`,
    payload: value
  }),

  getUserCredentials: (value) => ({
    type: `SET_USER_CREDENTIALS`,
    payload: value
  }),

  getFavorites: (value) => ({
    type: `GET_FAVORITES`,
    payload: value
  }),

  setActivePinCoords: (coords) => ({
    type: `SET_ACTIVE_PIN`,
    payload: coords
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      currentCity: action.payload,
    });

    case `LOAD_OFFERS`: return Object.assign({}, state, {
      allOffers: action.payload.offers,
      isLoading: action.payload.isLoading,
    });

    case `AUTHORIZE`: return Object.assign({}, state, {
      isAuthorized: action.payload
    });

    case `SET_EMAIL`: return Object.assign({}, state, {
      email: action.payload
    });

    case `GET_FEEDBACKS`: return Object.assign({}, state, {
      feedbacks: action.payload
    });

    case `SET_SORTED_OFFERS`: return Object.assign({}, state, {
      currentOffers: action.payload
    });

    case `SET_USER_CREDENTIALS`: return Object.assign({}, state, {
      userCredentials: action.payload
    });

    case `GET_FAVORITES`: return Object.assign({}, state, {
      favorites: action.payload
    });

    case `SET_ACTIVE_PIN`: return Object.assign({}, state, {
      activeCardCoords: action.payload
    });
  }

  return state;
};


export const Operations = {
  loadOffers: () => (dispatch, state, api) => {
    return api.get(`/hotels`)
    .then((respond) => {
      dispatch(ActionCreator.loadOffers(respond.data));
    });
  },
  loadFeedbacks: (id) => (dispatch, state, api) => {
    return api.get(`/comments/` + id)
      .then((respond) => {
        dispatch(ActionCreator.getFeedbacks(respond.data));
      });
  },
  sendCredentials: (email, password) => (dispatch, state, api) => {
    const params = {
      email,
      password,
    };

    return api.post(`/login`, params)
      .then((respond) => {
        dispatch(ActionCreator.getUserCredentials(respond.data));
      }).then(dispatch(ActionCreator.authorize(true)));
  },

  setAuthorizationFlag: (value) => (dispatch, _) => {
    dispatch(ActionCreator.authorize(value));
  },

  sendComment: (id, comment) => (dispatch, state, api) => {
    return api.post(`/comments/` + id, comment)
      .then((respond) => {
        dispatch(ActionCreator.getFeedbacks(respond.data));
      });
  },

  loadFavorites: () => (dispatch, state, api) => {
    return api.get(`/favorite`)
      .then((respond) => {
        dispatch(ActionCreator.getFavorites(respond.data));
      });
  },

  setFavorite: (hotelId, status) => (dispatch, state, api) => {
    return api.post(`/favorite/` + hotelId + `/` + status);
  }
};
