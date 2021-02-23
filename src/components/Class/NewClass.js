import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_CLASS = gql`
	mutation createClass($day: string, $hour: float, $name: string) {
		createClass(day: $day, hour: $hour, name: $name) {
			id
			name
		}
	}
`;

const NewClass = () => {
	const [addClass] = useMutation(ADD_CLASS, {
		refetchQueries: [
			{
				query: gql`
					query allClasses {
						allClasses {
							id
							name
							day
							hour
						}
					}
				`,
			},
		],
	});

	const submitNewClass = (e) => {
		e.preventDefault();

		addClass({
			variables: {
				day: e.target.day.value,
				hour: e.target.hour.value,
				name: e.target.name.value,
			},
		});
	};

	return (
		<div>
			{" "}
			<h4 className="ui dividing header">New Class:</h4>
			<form className="ui form" onSubmit={(e) => submitNewClass(e)}>
				<div className="field">
					<label>Day</label>
					<input type="text" name="day" placeholder="Enter the day" />
				</div>
				<div className="field">
					<label>Hour</label>
					<input type="number" name="hour" placeholder="Enter the hour" />
				</div>
				<div className="field">
					<label> Activity Name: </label>
					<input type="text" name="activity" placeholder="Activity name" />
				</div>
				<button className="ui button" type="submit">
					Create Class
				</button>
			</form>
		</div>
	);
};

export default NewClass;
