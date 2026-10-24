import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CustomModal from '../components/custommodal'

describe('<CustomModal>', () => {
	it('Check if CustomModal is visible', () => {
		render(<CustomModal show={ true }></CustomModal>)
		expect(screen.getByRole('definition')).toBeVisible()
	})

	it('Check if CustomModal contains prop text', () => {
		render(<CustomModal show={ true } message='test message!'></CustomModal>)
		expect(screen.getByRole('definition')).toHaveTextContent('test message!')
	})

	it('Check if CustomModal works with button press', () => {
		const mockFn = jest.fn()
		render(<CustomModal show={ true } message='test message!' fn={ mockFn }></CustomModal>)
		userEvent.click(screen.getByTestId('modalButton'))
		expect(mockFn).toHaveBeenCalled()
	})
})
