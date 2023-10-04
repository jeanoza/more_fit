/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import SiginIn from '../../../(auth)/sign-in/page';
 
describe('<SignIn/>', () => {
	it ('render without error and necessary elements exist on page', () => {
		const {container} = render(<SiginIn />)

		expect(screen.getByText('Sign In')).toBeInTheDocument()
		expect(screen.getByTestId('sign-form')).toBeInTheDocument()
	})
})