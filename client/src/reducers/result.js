let initialState = null;

const result = (state = initialState, action) => {
  switch (action.type) {
    case "setResult":
      return state = action.payload;
    default:
      return state;
  }
};

export default result;
