import React from "react";

const NewAssistant = () => {
	const submitNewAsistant = (e) => {
		e.preventDefault();

		//create the new assistant
	};
	return (
		<div>
			<h4 className="ui dividing header"> New Assistant</h4>
			<form className="ui form" onSubmit={(e) => submitNewAsistant(e)}>
				<div className="field">
					<label>Name</label>
					<input type="text" name="name" placeholder="Enter the name" />
				</div>
				<div className="field">
					<label> E-Mail</label>
					<input type="text" name="email" placeholder="Enter the e-mail" />
				</div>
				<button className="ui button" type="submit">
					Create
				</button>
			</form>
		</div>
	);
};

export default NewAssistant;
