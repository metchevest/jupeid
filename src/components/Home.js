import React, { useState, useEffect } from "react";
import Tour from "reactour";

import SignIn from "./Auth/SignIn";
import { useUserQuery } from "./Auth/userQuery";
import { homeSteps } from "./Tour/steps";

const Home = () => {
	const userData = useUserQuery();

	const [isTourOpen, setIsTourOpen] = useState(false);

	if (userData.data) {
		return (
			<div>
				<h4> Welcome to JUPEID</h4>
				New user ?{" "}
				<div className="ju-link" onClick={() => setIsTourOpen(true)}>
					{" "}
					Take the tour...
				</div>
				<Tour
					steps={homeSteps}
					isOpen={isTourOpen}
					onRequestClose={() => {
						setIsTourOpen(false);
					}}
				/>
			</div>
		);
	}

	return (
		<div className="ju-central-panel">
			<div>
				<h3> Welcome to Jupeid !!! </h3>
			</div>
			<div className="ju-link" onClick={() => setIsTourOpen(true)}>
				Take the tour...
			</div>
			<Tour
				steps={homeSteps}
				isOpen={isTourOpen}
				onRequestClose={() => {
					setIsTourOpen(false);
				}}
			/>

			<div>
				<SignIn />
			</div>
		</div>
	);
};

export default Home;
