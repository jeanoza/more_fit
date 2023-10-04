/**
 * @jest-environment jsdom
 */
import InputField from '@/app/components/input/input-field'
import { render } from '@testing-library/react'

const inputFieldProps = {
	type:"text",
	label:"text",
	placeholder:"text",
	value:"test text",
	setValue:jest.fn(),
}
describe('<Input/>', () => {
	it('renders Input unchanged', () => {
		const { container } = render(<InputField {...inputFieldProps}/>)
	})
})