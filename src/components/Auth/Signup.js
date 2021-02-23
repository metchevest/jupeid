import React from "react";
import { useMutation, gql } from "@apollo/client";

const SIGN_UP = gql`
	mutation signup($email: String, $password: String) {
		signup(email: $email, password: $password) {
			id
			email
		}
	}
`;

const Signup = () => {
	const [signUpUser] = useMutation(SIGN_UP, {
		refetchQueries: [
			{
				query: gql`
					query allUsers {
						allUsers {
							id
							email
						}
					}
				`,
			},
		],
	});

	const signupuser = (e) => {
		e.preventDefault();
		console.log("En el event handler");
		signUpUser({
			variables: {
				email: e.target.email.value,
				password: e.target.password.value,
			},
		});
	};

	return (
		<div>
			<h4 className="ui dividing header">Sign up:</h4>
			<form className="ui form" onSubmit={(e) => signupuser(e)}>
				<div className="field">
					<label>E-mail</label>
					<input type="text" name="email" placeholder="E-mail" />
				</div>

				<div className="field">
					<label>Password</label>
					<input type="password" name="password" placeholder="Password" />
				</div>

				<button className="ui button" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
