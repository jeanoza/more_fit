import Link from "next/link";
import Button from "../components/button/button";

interface SignFormProps {
	children:React.ReactNode;
	redirection?:string;
}

export default function SignForm ({children, redirection}:SignFormProps){
	async function handleSubmit () {
		if (children && Array.isArray(children)){
			const body:Record<string, any> = {};
			children.forEach((child) => {
				if (child.props) {
					const { label, value } = child.props;
					if (label) body[label] = value;
				}
			});

			// try {
			// 	const res = await fetch("http://localhost:8000/api/auth/sign-up" , {
			// 		mode:"cors",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		// 'Content-Type': 'application/x-www-form-urlencoded',
			// 		},
			// 		body:JSON.stringify(body),
			// 		method:"POST"
			// 	})
			// 	console.log(res);
			// } catch (e) {
			// 	console.error(e);
			// }
		}
	}
	function clearForm() {
		if (children && Array.isArray(children)){
			children.forEach((child) => {
				if (child.props) {
					const { setValue } = child.props;
					if (setValue) setValue("");
				}
			});
		}
	}
	
	return <div data-testid="sign-form" className="">
		<form>
			<div className="my-6 flex flex-col gap-2">
				{children}
			</div>
		</form>
		{redirection &&
			<div className="flex gap-1 mb-4">
				<p className="">Do you wanna</p>
				<Link className="underline decoration-gray-500"
					href={redirection}>{redirection?.slice(1).replace("-", " ")}?
				</Link>
			</div>
		}
		<div className="flex gap-3 justify-end">
			<Button label="submit" accent onClick={handleSubmit}/>
			<Button label="cancel" onClick={clearForm}/>
		</div>
	</div>
}