/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import Sport from './page';
 
it('renders sport unchanged', () => {
	const { container } =  render(<Sport />)
})