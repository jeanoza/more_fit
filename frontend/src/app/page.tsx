'use client';
import { sum } from './utils/calculate';
import useFetch from './hooks/useFetch';

export default function Home() {

  const [data] = useFetch('https://jsonplaceholder.typicode.com/todos');

  console.log(data);
  const a = 1;
  const b = 2;
  return (<div> a + b = {sum(a,b)}</div>)
}
