'use client'
interface InputFieldProps {
	type:string;
	label:string;
	placeholder:string;
	value:string;
	setValue:(value:string) => void;
}

export default function InputField({type, placeholder, label, value, setValue}:InputFieldProps) {

	function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}
	return <div className="max-w-xs flex justify-between gap-2">
		<label className="capitalize text-sm">{label}</label>
		<input className="text-sm focus:outline-none" type={type} placeholder={placeholder} value={value} onChange={handleChange}/>
	</div>
}