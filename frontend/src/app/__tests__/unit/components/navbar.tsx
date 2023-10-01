/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { ButtonProps } from '@/app/components/button/button'
import Navbar, { NAVBAR_LINKS, NavbarProps} from '@/app/components/navbar/navbar'
import { render, screen } from '@testing-library/react'


const navbarProps:NavbarProps = {
	auth: true,
}


describe('<Navbar/>', () => {
	it('should render navbar', () => {
		render(<Navbar {...navbarProps}/>)

		expect(screen.getByTestId('navbar')).toBeInTheDocument()
	})
	it('should contains navbar links which contains href', () => {
		render(<Navbar {...navbarProps}/>)

		NAVBAR_LINKS.forEach(link => {
			expect(screen.getByText(link.title)).toBeInTheDocument();
			expect(screen.getByText(link.title).closest('a')).toHaveAttribute('href', link.url);
		})
	})
	it ('should user name when auth is true', () => {
		render(<Navbar {...navbarProps} auth={true}/>)

		expect(screen.getByText('User')).toBeInTheDocument();
	});
	it ('should show sign in button when auth is false', () => {
		render(<Navbar {...navbarProps} auth={false}/>)

		expect(screen.getByText('Sign In')).toBeInTheDocument();
	})
})