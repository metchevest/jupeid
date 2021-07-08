import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tour from "reactour";

import SignIn from "./Auth/SignIn";
import { useUserQuery } from "./Auth/userQuery";
import { homeSteps } from "./Tour/steps";

const Home = () => {
	const userData = useUserQuery();

	const [isTourOpen, setIsTourOpen] = useState(false);

	useEffect(() => {
		if (userData.data) {
			setIsTourOpen(userData.data.profile.tour);
		}
	}, [userData]);

	if (userData.data) {
		return (
			<div>
				<h4> Welcome to JUPEID</h4>
				New user ? <Link to="/tour"> Take the tour...</Link>
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

			<div>
				<SignIn />
			</div>
		</div>
	);
};

export default Home;
