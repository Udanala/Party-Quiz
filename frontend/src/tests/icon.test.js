import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import DeleteIcon from '../components/deleteicon'

describe('<DeleteIcon>', () => {
  it('Check if DeleteIcon is visible', () => {
    render(<DeleteIcon></DeleteIcon>)
    expect(screen.getByTitle('delIcon')).toBeVisible()
  })
})
