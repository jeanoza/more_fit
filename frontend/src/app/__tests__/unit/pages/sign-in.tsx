/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import SiginIn from '../../../(auth)/sign-in/page';
 
it('renders SignIn page unchanged', () => {
	const { container } = render(<SiginIn />)
})