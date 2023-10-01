import { useState, useEffect } from "react";

const useFetch = (url:string, init?:RequestInit) => {
	const [data, setData] = useState<any>(null);

	//   useEffect(() => {
	// 	fetch(url, init)
	// 	  .then((response) => response.json())
	// 	  .then((json) => setData(json));
	//   }, [url, init]);


	return [data];
};

export default useFetch;
