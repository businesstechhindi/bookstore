let initialState = null;

const booksData = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return state = action.payload;
    default:
      return state;
  }
};

export default booksData;
