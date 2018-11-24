import React from 'react';
import ReactDOM from 'react-dom';

const apiKey = '25bfb752';

class SearchField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			data: [],
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			search: event.target.value.split(' ').join('+'),
		});
	}

	componentDidUpdate(prevProps, prevState) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${this.state.search}`)
			.then(response => response.json())
			.then(result => {
				if (
					this.state.search != prevState.search &&
					this.state.search.length >= 3
				)
					this.props.updateData(
						result.Search.filter(
							items => items.Type != 'game' && items.Poster != 'N/A'
						)
					);
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="input-field col s10 offset-s1">
						<input id="searchMovies" type="text" onChange={this.handleChange} />
						<label for="searchMovies">Search</label>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchField;
