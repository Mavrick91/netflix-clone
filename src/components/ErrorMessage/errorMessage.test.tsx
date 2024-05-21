import { render, screen } from 'test-utils'
import ErrorMessage from './index'

describe('ErrorMessage', () => {
  it('should render the error message when error prop is provided', () => {
    const errorMessage = 'Something went wrong'
    render(<ErrorMessage error={errorMessage} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('error-message')
  })

  it('should not render anything when error prop is not provided', () => {
    render(<ErrorMessage />)

    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })

  it('should not render anything when error prop is an empty string', () => {
    render(<ErrorMessage error="" />)

    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })
})
