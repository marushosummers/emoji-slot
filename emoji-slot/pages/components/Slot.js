import React from "react";
import Reel from "./Reel";

class Slots extends React.Component {
	add_glimpse_pattern = (patterns) => {
		const first_pattern = patterns[0];
		console.log(first_pattern);
		const last_pattern = patterns[-1];
		console.log(last_pattern);
		patterns.unshift(first_pattern);
		patterns.push(last_pattern);
		return patterns;
	};

	static patterns = {
		fruits: ["🥝", "🍒", "🍉", "🍊", "🍓", "🍇", "🥝", "🍒"],
		animals: ["🦔", "🦄", "🦍", "🦊", "🐈", "🦒", "🦔", "🦄"],
		faces: ["😡", "🥺", "🤣", "🙂", "🥰", "🤪", "😡", "🥺"],
		foods: ["🥞", "🍣", "🍖", "🍔", "🍙", "🥟", "🥞", "🍣"],
	};

	constructor(props) {
		super(props);
		this.state = {
			patterns: Slots.patterns.fruits,
		};
	}

	handlePatternClick = (patternName) => {
		this.setState({ patterns: Slots.patterns[patternName] });
	};

	render() {
		return (
			<div className="SlotMachine">
				<Reel patterns={this.state.patterns} />
				<button onClick={() => this.handlePatternClick("fruits")}>🍒</button>
				<button onClick={() => this.handlePatternClick("animals")}>🦄</button>
				<button onClick={() => this.handlePatternClick("faces")}>🥺</button>
				<button onClick={() => this.handlePatternClick("foods")}>🍣</button>
			</div>
		);
	}
}

export default Slots;
