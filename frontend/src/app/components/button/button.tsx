import React from "react";

export interface ButtonProps {
	label:string;
	accent?:boolean;
	onClick?:() => void;
}

const defaultStyle = "bg-neutral-800 hover:bg-neutral-700"
const accentStyle = "bg-white hover:bg-neutral-200 text-neutral-800"

export default function Button(props:ButtonProps) {
	return <button
		data-testid="button"
		className={`px-3 py-1.5 capitalize rounded text-xs ${props.accent? accentStyle:defaultStyle}`}
		onClick={props.onClick}>{props.label}
	</button>
}