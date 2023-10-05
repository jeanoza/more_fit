/**
 * @jest-environment jsdom
 */
import InputField, { InputFieldProps } from './input-field'
import { render, screen, fireEvent } from '@testing-library/react'

const inputFieldProps:InputFieldProps = {
	type:"text",
	label:"text",
	placeholder:"text",
	value:"test text",
	setValue: jest.fn(),
}

describe('<Input/>', () => {
	it('renders Input unchanged', () => {
		const { container } = render(<InputField {...inputFieldProps}/>)
		expect(container).toBeInTheDocument();
	})
	it ('calls setValue on change', () => {
		render(<InputField {...inputFieldProps}/>)

		const input = screen.getByTestId('input');

		fireEvent.change(input, { target: { value: 'new text' } })
		expect(inputFieldProps.setValue).toHaveBeenCalledTimes(1);
		expect(inputFieldProps.setValue).toHaveBeenCalledWith('new text');
	})
})