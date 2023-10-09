import { useEffect, useState } from "react";

export default function useFetch<T>(url:RequestInfo, options?:RequestInit) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<unknown>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(url, options);
				const data = await response.json();
				setData(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setError(error);
				setLoading(false);
			}
		}
		fetchData();
	}, []); 
	return { data, error, loading };
}