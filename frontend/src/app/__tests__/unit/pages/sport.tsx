/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import Sport from '@/app/sport/page';
 
it('renders sport unchanged', () => {
	const { container } =  render(<Sport />)
})