import React from "react";
import Reel from "./Reel";
import {
	TwitterShareButton,
	TwitterIcon,
} from "react-share";
class Slots extends React.Component {
	componentDidMount() {
		history.pushState("", "", "/");
	}

	static patterns = {
		fruits: ["🥝", "🍒", "🍉", "🍌", "🍋", "🍇", "🥝", "🍒"],
		animals: ["🦔", "🦄", "🦍", "🦊", "🐈", "🦒", "🦔", "🦄"],
		faces: ["😡", "🥺", "🤣", "🙂", "🥰", "🤪", "😡", "🥺"],
		foods: [ "🥞", "🍣", "🍖", "🍔", "🍙", "🥟", "🥞", "🍣"],
	};

	constructor(props) {
		super(props);
		this.state = {
			patterns: Slots.patterns.fruits,
			result1: null,
			result2: null,
			result3: null,
		};
	}

	updateResult = (result) => {
		this.setState({
			result1: result.pattern1,
			result2: result.pattern2,
			result3: result.pattern3,
		});
	};

	handlePatternClick = (patternName) => {
		this.setState({
			patterns: Slots.patterns[patternName],
		});
	};

	getURL = (state) => {
		if (!state.result1) {
			return new URL("https://emoji-slot.marusho.io");
		}

		const url = new URL("https://emoji-slot.marusho.io");

		url.searchParams.append("p1", state.result1);
		url.searchParams.append("p2", state.result2);
		url.searchParams.append("p3", state.result3);
		return url;
	};

	render() {
		return (
			<div className="emojiSlot">
				<div className="SlotMachine">
					<Reel
						patterns={this.state.patterns}
						key={this.state.patterns}
						ref="reel"
						updateResult={this.updateResult}
					/>
					<button onClick={() => this.handlePatternClick("fruits")}>🍒</button>
					<button onClick={() => this.handlePatternClick("animals")}>🦄</button>
					<button onClick={() => this.handlePatternClick("faces")}>🥺</button>
					<button onClick={() => this.handlePatternClick("foods")}>🍣</button>
				</div>
				<div className="share">
					<div className="balloon">
						{this.state.result1}
						{this.state.result3}
						{this.state.result2}
					</div>
					<div className="share_icon">
						<TwitterShareButton
							title="Emoji-Slot"
							url={this.getURL(this.state)}
						>
							<TwitterIcon size={28} round bgStyle={{ fill: "black" }} />
						</TwitterShareButton>
					</div>
				</div>
			</div>
		);
	}
}

export default Slots;
