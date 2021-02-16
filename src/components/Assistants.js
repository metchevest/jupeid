import React from "react";

const Assistants = () => {
	return (
		<div>
			<form>
				<div className="ui grid">
					<div className="inline field">
						Karen
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
						</label>
					</div>
					<div className="inline field">
						Julia
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
							Julia
						</label>
					</div>
					<div className="inline field">
						Ana
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
						</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Assistants;
