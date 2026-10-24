import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CustomToast from '../components/customtoast'

describe('<CustomToast>', () => {
  it('Check if CustomToast is visible', () => {
    render(<CustomToast></CustomToast>)
    expect(screen.getByRole('alert')).toBeVisible()
  })

  it('Check if CustomToast contains prop text', async () => {
    render(<CustomToast setShowToast={ true } message='sample message'></CustomToast>)
    expect(await screen.getByRole('alert')).toHaveTextContent('sample message');
  })
})
