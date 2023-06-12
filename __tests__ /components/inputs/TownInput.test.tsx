import { TownInput } from '@/components/inputs/TownInput'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('TownInput', () => {
  test('', () => {
    render(<TownInput />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })
})
