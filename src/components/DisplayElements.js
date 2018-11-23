import React from 'react';
import MovieModal from './MovieModal.js';

import '../styles.css';

class DisplayElements extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieID: '',
		};
	}

	updateMovieID = movie => {
		this.setState({
			movieID: movie.imdbID,
		});
	};

	render() {
		let foundMovies = this.props.data;
		console.log('state of display element', this.state.movieID);
		return (
			<div className="container displayElements">
				<div className="row flex">
					{foundMovies.map(movie => (
						<div
							className="col hoverable"
							onClick={this.updateMovieID.bind(this, movie)}
						>
							<MovieModal
								movieID={this.state.movieID}
								domElement={
									<img
										className="z-depth-4 responsive-img"
										src={movie.Poster}
									/>
								}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default DisplayElements;
