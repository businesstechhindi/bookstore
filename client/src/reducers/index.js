import booksData from "./booksdata";
import userData from "./userData";
import result from "./result";

import { combineReducers } from "redux";

// we have to import all reducers and pass below
const rootReducer = combineReducers({
  booksData,
  userData,
  result
});

//we can write like this also but as we know when in object key and value both are same then we don't need to write twice we can write it only once
// const rootReducer = combineReducers({
//     changeTheNumber:changeTheNumber
// })

export default rootReducer;
