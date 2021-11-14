const setMovie = (movies, forFilter) => {
	return {
		type: "setmovies",
		payload: { movies: [...movies], forFilter: [...forFilter] },
	};
};

export default setMovie;
