import Button from "../components/button/button";

interface SignFormProps {
	children:React.ReactNode;
}

export function SignForm ({children}:SignFormProps){
	function handleSubmit () {
		if (children && Array.isArray(children)){
			const obj:Record<string, any> = {};
			children.forEach((child) => {
				if (child.props) {
					const { type, value } = child.props;
					if (type) obj[type] = value;
				}
			});
			//TODO: send obj to server
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
		<div className="flex gap-3 justify-end">
			<Button label="submit" accent onClick={handleSubmit}/>
			<Button label="cancel" onClick={clearForm}/>
		</div>
	</div>
}