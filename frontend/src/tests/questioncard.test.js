import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import QuestionCard from '../components/questioncard'
import { BrowserRouter } from 'react-router-dom'

describe('<QuestionCard>', () => {
  it('Check if QuestionCard component is visible', () => {
    render(
      <BrowserRouter> // Need to wrap component in router as it has a useNavigate
      <QuestionCard title='test' questionId='123' questionType='single' timeLimit='20' points='15' answer={[1, 2, 3]} allOptions={[1, 2, 3]}></QuestionCard>
      </BrowserRouter>)
    expect(screen.getByRole('questioncard')).toBeVisible()
  })

  it('Check edit button click', () => {
    render(
      <BrowserRouter>
      <QuestionCard title='test' questionId='123' questionType='single' timeLimit='20' points='15' answer={[1, 2, 3]} allOptions={[1, 2, 3]}></QuestionCard>
      </BrowserRouter>)
    expect(screen.getByRole('questioncard')).toBeVisible()
    userEvent.click(screen.getByRole('button')) // Coverage
  })
})
