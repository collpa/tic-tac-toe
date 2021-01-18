import boardCells from "./reducers/boardCellsReducer";
import turn from "./reducers/turnReducer";
import haveWinner from "./reducers/haveWinnerReducer";
import winner from "./reducers/winnerReducer";
import endGame from "./reducers/endGameReducer";
import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
  boardCells,
  turn,
  haveWinner,
  winner,
  endGame,
});

const store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
