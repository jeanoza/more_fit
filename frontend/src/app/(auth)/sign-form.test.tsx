/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react'
import SignForm from './sign-form';

 
const setValue = jest.fn();
const handleSubmit = jest.fn();

describe("<SignForm/>", () => {
	it('renders  unchanged', () => {
		const { container } =  render(<SignForm>
			<div>test</div>
		</SignForm>)
	})
	test('it should handle form submission and clearing', () => {
		// Define some mock child components to use within SignForm
		const mockChild1 = <input type="text" defaultValue="username" />;
		const mockChild2 = <input type="password" defaultValue="password" />;
		const { getByTestId, getByText, getByLabelText } = render(
			<SignForm>
				{mockChild1}
				{mockChild2}
			</SignForm>
		);

		// Simulate a form submission
		const submitButton = getByText('submit');
		fireEvent.click(submitButton);

		// Simulate clearing the form
		const cancelButton = getByText('cancel');
		fireEvent.click(cancelButton);

		// Example assertions:
		expect(handleSubmit).toBeCalled(); // If handleSubmit is mocked
		expect(setValue).toHaveBeenCalledWith(''); // If setValue is mocked
	});
});
