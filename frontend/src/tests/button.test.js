import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CustomButton from '../components/custombutton'

describe('<CustomButton>', () => {
  it('Check if CustomButton is visible', () => {
    render(<CustomButton></CustomButton>)
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('Check if CustomButton implements prop text', () => {
    render(<CustomButton text='Sample Text! #$%'></CustomButton>)
    expect(screen.getByText('Sample Text! #$%')).toHaveTextContent('Sample Text! #$%')
  })

  it('Check if CustomButton implements function', () => {
    const mockFn = jest.fn()
    render(<CustomButton onClick={ mockFn }></CustomButton>)

    userEvent.click(screen.getByRole('button'))

    expect(mockFn).toHaveBeenCalled()
  })
})
