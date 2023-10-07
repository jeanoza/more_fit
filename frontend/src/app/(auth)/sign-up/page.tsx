'use client'
import { useState } from "react";
import SignForm from "../sign-form";
import InputField from "@/app/components/input/input-field";

export default function SignUp() {
	const [nickName, setNickName] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return <div className="flex flex-col justify-center items-center h-screen">
		<h1 className="text-2xl">Sign Up</h1>
		<SignForm redirection="/sign-in">
			<InputField type="text" label="nick_name" placeholder="jeanoza" value={nickName} setValue={setNickName}/>
			<InputField type="text" label="first_name" placeholder="Jean-Paul" value={firstName} setValue={setFirstName}/>
			<InputField type="text" label="last_name" placeholder="Sartre" value={lastName} setValue={setLastName}/>
			<InputField type="email" label="email" placeholder="jp.sartre@gmail.com" value={email} setValue={setEmail}/>
			<InputField type="password" label="password" placeholder="castor01091908" value={password} setValue={setPassword}/>
		</SignForm>
	</div>
}