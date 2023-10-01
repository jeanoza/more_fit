import React from "react";

interface ButtonProps {
	label:string;
	onClick?:() => void;
}

export default function Button(props:ButtonProps) {
	return <button>{props.label}</button>
}