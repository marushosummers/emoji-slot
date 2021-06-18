import React from "react";
import Reel from "./Reel";

class Slots extends React.Component {
	static patterns = {
		fruits: ["🍒", "🍉", "🍌", "🍋", "🍇", "🥝"],
		animals: ["🦄", "🦍", "🦊", "🐈", "🦒", "🦔"],
		faces: ["🥺", "🤣", "🙂", "🥰", "🤪", "😡"],
		foods: ["🍣", "🍖", "🍔", "🍙", "🥟", "🥞"],
	};

	add_glimpse_pattern = (patterns) => {
		const _patterns = patterns.slice()
		const first_pattern = patterns[0];
		const last_pattern = patterns.slice(-1)[0];
		_patterns.push(first_pattern);
		_patterns.unshift(last_pattern);
		return _patterns;
	};

	constructor(props) {
		super(props);
		this.state = {
			patterns: this.add_glimpse_pattern(Slots.patterns.fruits),
		};
	}

	handlePatternClick = (patternName) => {
		this.setState({ patterns: this.add_glimpse_pattern(Slots.patterns[patternName]) });
	};

	render() {
		return (
			<div className="SlotMachine">
				<Reel patterns={this.state.patterns} key={this.state.patterns} />
				<button onClick={() => this.handlePatternClick("fruits")}>🍒</button>
				<button onClick={() => this.handlePatternClick("animals")}>🦄</button>
				<button onClick={() => this.handlePatternClick("faces")}>🥺</button>
				<button onClick={() => this.handlePatternClick("foods")}>🍣</button>
			</div>
		);
	}
}

export default Slots;
