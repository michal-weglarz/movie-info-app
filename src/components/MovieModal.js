import React from 'react';
import '../modalStyles.css';
import { Modal, Button } from 'react-materialize';

const apiKey = '25bfb752';

const display = {
	display: 'block',
};
const hide = {
	display: 'none',
};

class MovieModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieDetails: [],
		};
	}

	componentDidUpdate(prevProps, prevState) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${this.props.movieID}`)
			.then(response => response.json())
			.then(result => {
				if (this.props.movieID != prevProps.movieID) {
					this.setState({
						movieDetails: result,
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.movieID != this.props.movieID) {
			this.setState({
				movieDetails: [],
			});
		}
	}

	getMovieDetails = movieId => {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${this.props.movieID}`)
			.then(response => response.json())
			.then(result => result);
	};

	getMovieStars = rating => {
		let imdbRating = rating.imdbRating;
		let starRating = Math.round(imdbRating) / 2;
		let wholeNumber = Math.floor(starRating);
		let fraction = starRating - wholeNumber;
		let stars, uncheckedStars;

		if (!isNaN(wholeNumber)) {
			stars = Array.apply(null, Array(wholeNumber)).map(_ => (
				<i className="material-icons checked">star</i>
			));
			uncheckedStars = Array.apply(null, Array(5 - Math.ceil(starRating))).map(
				_ => <i className="material-icons unchecked">star</i>
			);
		}

		let halfStar = fraction && (
			<i className="material-icons checked">star_half</i>
		);
		stars && halfStar && stars.push(halfStar);
		let result = (stars, uncheckedStars) && stars.concat(uncheckedStars);
		return result;
	};

	render() {
		let movieDetails = this.state.movieDetails;
		console.log('this.state', this.state.movieDetails);

		return (
			<Modal
				header={movieDetails.Title}
				fixedFooter
				trigger={this.props.domElement}
			>
				<div id="movieTitle">
					<div className="row">
						<div className="col">{movieDetails.Year}</div>
						<div className="col">{movieDetails.Runtime}</div>
						<div className="col">{movieDetails.Rated}</div>
					</div>
				</div>
				<div className="row modalBox">
					<div className="col s12 m6 l4">
						<img
							src={movieDetails.Poster}
							id="moviePoster"
							onError={() => {
								console.log('error');
							}}
						/>
					</div>

					<div className="col s12 m6 l8">
						<p id="moviePlot">{movieDetails.Plot}</p>

						<div className="row movieInfo">
							<div className="col s12">
								{this.getMovieStars(movieDetails)}
								{movieDetails.imdbRating}
							</div>
							<div>
								<b>Genre: </b>
								{movieDetails.Genre}
							</div>
							<div>
								<b>Director:</b> {movieDetails.Director}
							</div>
							<div>
								<b>Starring:</b> {movieDetails.Actors}
							</div>
							<div>
								<b>Country:</b> {movieDetails.Country}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default MovieModal;
