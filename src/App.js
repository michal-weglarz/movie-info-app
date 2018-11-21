import React from 'react';

import './styles.css';
import './modalStyles.css';

import MovieModal from './components/MovieModal.js';
import SearchField from './components/SearchField.js';
import DisplayElements from './components/DisplayElements.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	updateData(newData) {
		this.setState({
			data: newData,
		});
	}

	render() {
		return (
			<div>
				<MovieModal
					show={this.state.displayModal}
					movieID={this.state.movieID}
				/>
				<div>
					<center>
						<h3 className="pageTitle" style={{ color: '#ffffff' }}>
							Movie Info App
						</h3>
					</center>
					<SearchField updateData={this.updateData.bind(this)} />
					<DisplayElements data={this.state.data} />
				</div>
			</div>
		);
	}
}

export default App;
