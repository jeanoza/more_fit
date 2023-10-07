'use client'
import { useState } from "react";
import SignForm from "../sign-form";
import InputField from "@/app/components/input/input-field";

export default function SignIn() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	return <div className="flex flex-col justify-center items-center h-screen">
		<h1 className="text-2xl">Sign In</h1>
		<SignForm redirection="/sign-up">
			<InputField type="email" label="email" placeholder="jp.sartre@gmail.com" value={email} setValue={setEmail}/>
			<InputField type="password" label="password" placeholder="castor01091908" value={password} setValue={setPassword}/>
		</SignForm>
	</div>
}