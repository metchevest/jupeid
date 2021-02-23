import React from "react";
import NewClass from "../Class/NewClass";

import NewAssistant from "./NewAssistant";

const Assistants = () => {
	return (
		<div className="ju-central-panel">
			<h1 className="ju-font"> Assistans for today:</h1>
			<div className="ui grid container">
				<div className="two wide column border">
					<div className="inline-name-check">
						Karen
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
						</label>
					</div>
				</div>
				<div className="five wide column border">
					<div className="inline field">
						Julia
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
							Julia
						</label>
					</div>
				</div>
				<div className="five wide column border">
					<div className="inline field">
						Ana
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
						</label>
					</div>
				</div>
			</div>
			<NewAssistant />
		</div>
	);
};

export default Assistants;
