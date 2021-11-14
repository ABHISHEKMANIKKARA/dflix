import React from "react";
import "./Header.css";
import back from "../../Slices/Back.png";
import search from "../../Slices/search.png";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import { useState } from "react";

function Header() {
	const [searchbox, setSearchBox] = useState(false);

	let moviesForFilter = useSelector((state) => {
		return state.movies.forFilter;
	});
	let dispatch = useDispatch();

	function handleClick() {
		setSearchBox(true);
	}

	function handleSearch(e) {
		const filteredBySearch = moviesForFilter.filter((item) => {
			return Object.keys(item).some((key) => {
				if (item[key])
					return item[key].toLowerCase().includes(e.target.value.toLowerCase());
			});
		});
		dispatch(allActions.setMovie([...filteredBySearch], [...moviesForFilter]));
	}
	return (
		<>
			<div className="header">
				<img className="back" src={back} />
				<div className="title">Romantic Movies</div>
				<img className="search" src={search} onClick={handleClick} />
			</div>
			{searchbox ? (
				<div className="searchsection">
					<input onChange={handleSearch} className="searchbox" type="text" />
					<div>
						<button onClick={() => setSearchBox(false)} className="closebutton">
							close
						</button>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}

export default Header;
