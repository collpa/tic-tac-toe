import { RESET_GAME, UPDATE_TURN } from "../actions/actions";

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function boardCellsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_GAME:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0];
    case UPDATE_TURN:
      return payload;
    default:
      return state;
  }
}

export default boardCellsReducer;
