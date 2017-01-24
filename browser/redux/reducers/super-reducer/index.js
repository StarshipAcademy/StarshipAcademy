import { Map, List } from 'immutable';

let Tivo = null;

// This design pattern helps avoid the nesting problem that combineReducers creates.
export default (state, reducers, action) => {
  // Edge Case - App just initialized;
  if (!Tivo) {
    // State at this moment is an immutable Map.
    Tivo = List.of(state);
  }

  // For all of our reducers...
  reducers.forEach(reducer => {
    // Take our current recordings
    Tivo = Tivo.push(
      // Make a new Map
      Map(
        // That is the reduction of the last state
        // With this action
        reducer(Tivo.last(), action)
      )
    );
  });

  // Return the new last state.
  return Tivo.last();
};
