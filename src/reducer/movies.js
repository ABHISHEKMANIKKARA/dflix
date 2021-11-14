const movies = (state = { movies: [], forFilter: [] }, action) => {
	switch (action.type) {
		case "setmovies":
			return {
				movies: [...action.payload.movies],
				forFilter: [...action.payload.forFilter],
			};
		default:
			return state;
	}
};

export default movies;
