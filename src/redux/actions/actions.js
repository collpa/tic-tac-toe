export const UPDATE_TURN = "UPDATE_TURN";
export const HAVE_WINNER = "HAVE_WINNER";
export const END_GAME = "END_GAME";
export const RESET_GAME = "RESET_GAME";

export const updateTurn = (payload) => ({
  type: UPDATE_TURN,
  payload,
});

export const haveWinner = (payload) => ({
  type: HAVE_WINNER,
  payload,
});

export const endGame = {
  type: END_GAME,
  payload: null,
};

export const resetGame = {
  type: RESET_GAME,
  payload: null,
};
