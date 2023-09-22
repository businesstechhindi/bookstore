let initialState = null;

const booksData = (state = initialState, action) => {
  switch (action.type) {
    case "setBooksData":
      return (state = action.payload);
    default:
      return state;
  }
};

export default booksData;
