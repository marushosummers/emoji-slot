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
		fruits: ["ðĨ", "ð", "ð", "ð", "ð", "ð", "ðĨ", "ð"],
		animals: ["ðĶ", "ðĶ", "ðĶ", "ðĶ", "ð", "ðĶ", "ðĶ", "ðĶ"],
		faces: ["ðĄ", "ðĨš", "ðĪĢ", "ð", "ðĨ°", "ðĪŠ", "ðĄ", "ðĨš"],
		foods: ["ðĨ", "ðĢ", "ð", "ð", "ð", "ðĨ", "ðĨ", "ðĢ"],
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

		url.searchParams.append("p1", state.result1 ?? "ð°");
		url.searchParams.append("p2", state.result2 ?? "ð°");
		url.searchParams.append("p3", state.result3 ?? "ð°");
		return url;
	};

	render() {
		return (
			<div className="emojiSlot">
				<div className="SlotMachine">
					<div className="patternsBtns">
						<div
							className="patternsBtn"
							onClick={() => this.handlePatternClick("fruits")}
						>
							ð
						</div>
						<div
							className="patternsBtn"
							onClick={() => this.handlePatternClick("animals")}
						>
							ðĶ
						</div>
						<div
							className="patternsBtn"
							onClick={() => this.handlePatternClick("faces")}
						>
							ðĨš
						</div>
						<div
							className="patternsBtn"
							onClick={() => this.handlePatternClick("foods")}
						>
							ðĢ
						</div>
					</div>
					<Reel
						patterns={this.state.patterns}
						key={this.state.patterns}
						ref="reel"
						updateResult={this.updateResult}
					/>
				</div>
				<div className="share">
					<div className="balloon">
						<div className="pattern">{this.state.result1 ?? "ð°"}</div>
						<div className="pattern">{this.state.result3 ?? "ð°"}</div>
						<div className="pattern">{this.state.result2 ?? "ð°"}</div>
					</div>
					<div className="share_icon">
						<TwitterShareButton
							title={`${this.state.result1 ?? "ð°"} ${
								this.state.result3 ?? "ð°"
							} ${this.state.result2 ?? "ð°"}\n\n#emoji_slot\n`}
							url={this.getURL(this.state)}
						>
							<TwitterIcon size={28} round />
						</TwitterShareButton>
					</div>
				</div>
			</div>
		);
	}
}

export default Slots;
