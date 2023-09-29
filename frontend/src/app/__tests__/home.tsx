import { render } from '@testing-library/react'
import Home from '../page.tsx';
import useFetch from '../hooks/useFetch.tsx';
import { sum } from '../utils/calculate.tsx';
 
it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  console.log(container)
})