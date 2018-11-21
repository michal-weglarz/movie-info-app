import React from 'react';
import MovieModal from './MovieModal.js';

import '../styles.css';

class DisplayElements extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false,
			movieID: '',
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal = movie => {
		this.setState({
			displayModal: !this.state.displayModal,
			movieID: movie.imdbID,
		});
	};

	render() {
		return (
			<div className="container displayElements">
				<div className="row flex">
					<MovieModal
						show={this.state.displayModal}
						movieID={this.state.movieID}
					/>
					{this.props.data
						? this.props.data.map(movie => (
								<div className="col hoverable">
									<img
										className="z-depth-4 responsive-img"
										src={movie.Poster}
										onClick={this.toggleModal.bind(this, movie)}
									/>
								</div>
						  ))
						: ''}
				</div>
			</div>
		);
	}
}

export default DisplayElements;
