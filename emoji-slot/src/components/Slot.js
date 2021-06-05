import React from "react";

class Slots extends React.Component {
	static defaultProps = {
		fruits: ["🎰", "🎰", "🍒", "🍉", "🍊", "🍓", "🍇", "🥝", "🎰", "🎰"],
	};

	constructor(props) {
		super(props);
		this.state = { fruit1: "🍒", fruit2: "🍒", fruit3: "🍒", rolling: false };

		// get ref of dic onn which elements will roll
		this.slotRef = [React.createRef(), React.createRef(), React.createRef()];
	}

	// to trigger roolling and maintain state
	roll = () => {
		this.setState({
			rolling: true,
		});
	};

	// to stop roolling
	stop = () => {
		this.setState({
			rolling: false,
		});

		// looping through all 3 slots to start rolling
		this.slotRef.forEach((slot, i) => {
			// this will trigger stopping effect
			const selected = this.triggerSlotRotation(slot.current);
			this.setState({ [`fruit${i + 1}`]: selected });
		});
	};

	// this will create a rolling effect and return random selected option
	triggerSlotRotation = (ref) => {
		function setTop(top) {
			ref.style.top = `${top}px`;
		}
		let options = ref.children;
		let randomOption = Math.floor(
			Math.random() * Slots.defaultProps.fruits.length
		);
		let choosenOption = options[randomOption];
		console.log(-choosenOption.offsetTop);
		setTop(-choosenOption.offsetTop + 5);
		return Slots.defaultProps.fruits[randomOption];
	};

	render() {
		return (
			<div className="SlotMachine">
				<div className="slot">
					<section>
						<div
							className={this.state.rolling ? "rollContainer" : "container"}
							ref={this.slotRef[0]}
						>
							{Slots.defaultProps.fruits.map((fruit, i) => (
								<div key={i}>
									<span>{fruit}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div
							className={this.state.rolling ? "rollContainer" : "container"}
							ref={this.slotRef[1]}
						>
							{Slots.defaultProps.fruits.map((fruit, i) => (
								<div key={i}>
									<span>{fruit}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div
							className={this.state.rolling ? "rollContainer" : "container"}
							ref={this.slotRef[2]}
						>
							{Slots.defaultProps.fruits.map((fruit, i) => (
								<div key={i}>
									<span>{fruit}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div
					className={!this.state.rolling ? "roll rolling" : "roll"}
					onClick={!this.state.rolling && this.roll}
					disabled={this.state.rolling}
				>
					{this.state.rolling ? "Rolling..." : "ROLL"}
				</div>
				<div
					className={"stop"}
					onClick={this.state.rolling && this.stop}
					disabled={!this.state.rolling}
				>
					{this.state.rolling ? "stop" : "click roll"}
				</div>
			</div>
		);
	}
}

export default Slots;
