/**
 * @jest-environment jsdom
 */
import Button from '@/app/components/button/button'
import { render } from '@testing-library/react'

const buttonProps = {
	label: 'Test Button',
	onClick: () => {}
}
describe('<Button/>', () => {
	it('renders Button unchanged', () => {
		const { container } = render(<Button {...buttonProps}/>)

		expect(container.innerHTML).toBe(`<button>${buttonProps.label}</button>`)
	})
})