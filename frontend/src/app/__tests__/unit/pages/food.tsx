/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import Food from '@/app/food/page';
 
it('renders food unchanged', () => {
	const { container } =  render(<Food />)
})