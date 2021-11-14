import React, { useEffect, useState, useRef, useCallback } from "react";
import "./PageOne.css";
import apiCall from "../../API/api.js";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
let forFilter = [];
function PageOne() {
	const [page, setPage] = useState(1);
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const observer = useRef();

	let movies = useSelector((state) => {
		return state.movies.movies;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		const loadMovies = async () => {
			setLoading(true);
			let fetchedMovie = await apiCall(page);
			console.log(fetchedMovie, "fetched");
			{
				dispatch(
					allActions.setMovie(
						[...movies, ...fetchedMovie["content-items"]["content"]],
						[...movies, ...fetchedMovie["content-items"]["content"]]
					)
				);
			}
			setMovie([...movie, ...fetchedMovie["content-items"]["content"]]);
			forFilter = [...forFilter, fetchedMovie];
			setHasMore(fetchedMovie["total-content-items"]);
			setLoading(false);
		};
		loadMovies();
	}, [page]);

	const lastImage = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore > movie.length) {
					setPage((prev) => prev + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<>
			<div className="list">
				{movies
					? movies.map((item, index) => {
							let s = require(`../../Slices/${item["poster-image"]}`);
							if (movies.length == index + 1) {
								return (
									<div ref={lastImage} key={index} id="abhi" className="items">
										<img className="img" src={s.default} />
										<div className="movietitle">{item["name"]}</div>
									</div>
								);
							}
							return (
								<div key={index} className="items">
									<img className="img" src={s.default} />
									<div className="movietitle">{item["name"]}</div>
								</div>
							);
					  })
					: ""}
			</div>
		</>
	);
}

export default PageOne;
