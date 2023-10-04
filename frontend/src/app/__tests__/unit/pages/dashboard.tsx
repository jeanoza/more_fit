/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import Dashbaord from '@/app/dashboard/page';
 
it('renders homepage unchanged', () => {
	const { container } =  render(<Dashbaord />)
})