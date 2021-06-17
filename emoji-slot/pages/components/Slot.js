import React from "react";

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
	};

	static defaultProps = {
		patterns: Slots.patterns.fruits,
	};

	constructor(props) {
		super(props);
		this.state = {
			pattern1: props.patterns[1],
			pattern2: props.patterns[1],
			pattern3: props.patterns[1],
			rolling1: false,
			rolling2: false,
			rolling3: false,
		};

		// get ref of dic onn which elements will roll
		this.slotRef = [React.createRef(), React.createRef(), React.createRef()];
	}

	// to trigger roolling and maintain state
	roll = () => {
		this.setState({
			rolling1: true,
			rolling2: true,
			rolling3: true,
		});
	};

	// to stop roolling
	stop = () => {
		// TODO: Numは引数として取る方法を考える
		const Num = this.getNextStop();
		console.log(Num);
		this.setState({
			["rolling" + Num]: false,
		});

		// this will trigger stopping effect
		this.slotRef.forEach((slot, i) => {
			if (i === Num - 1) {
				const emojiIdx = this.getEmojiIdx();
				const emoji = this.getEmoji(emojiIdx);

				this.triggerStopEffect(slot.current, emojiIdx);
				this.setState({ [`pattern${i + 1}`]: emoji });
			}
		});
	};

	// get emoji Index
	getEmojiIdx = () => {
		return Math.ceil(Math.random() * (Slots.defaultProps.patterns.length - 2));
	};

	getEmoji = (Idx) => {
		return Slots.defaultProps.patterns[Idx];
	};
	// this will create a rolling effect and return random selected option
	triggerStopEffect = (ref, emojiIdx) => {
		function setTop(top) {
			ref.style.top = `${top}px`;
		}
		let options = ref.children;
		let choosenOption = options[emojiIdx];
		setTop(-choosenOption.offsetTop + 20);
	};

	isRolling = () => {
		return this.state.rolling1 || this.state.rolling2 || this.state.rolling3;
	};

	getNextStop = () => {
		if (!this.isRolling()) {
			throw Error("Exception Error");
		}
		if (this.state.rolling1 && this.state.rolling2 && this.state.rolling3) {
			return 1;
		}
		if (!this.state.rolling1 && this.state.rolling2 && this.state.rolling3) {
			return 2;
		}
		if (!this.state.rolling1 && !this.state.rolling2 && this.state.rolling3) {
			return 3;
		}
	};

	render() {
		return (
			<div className="SlotMachine">
				<div className="slot">
					<section>
						<div
							className={this.state.rolling1 ? "rollContainer" : "container"}
							ref={this.slotRef[0]}
						>
							{Slots.defaultProps.patterns.map((pattern, i) => (
								<div key={i}>
									<span>{pattern}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div
							className={this.state.rolling3 ? "rollContainer" : "container"}
							ref={this.slotRef[2]}
						>
							{Slots.defaultProps.patterns.map((pattern, i) => (
								<div key={i}>
									<span>{pattern}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div
							className={this.state.rolling2 ? "rollContainer" : "container"}
							ref={this.slotRef[1]}
						>
							{Slots.defaultProps.patterns.map((pattern, i) => (
								<div key={i}>
									<span>{pattern}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div role="img" aria-labelledby="image-1">
					<div
						className={this.isRolling() ? "btn stop" : "btn start"}
						onClick={
							this.isRolling()
								? () => {
										this.stop();
								  }
								: () => {
										this.roll();
								  }
						}
					>
						{this.isRolling() ? "⏱" : "🎰"}
					</div>
				</div>
			</div>
		);
	}
}

export default Slots;
