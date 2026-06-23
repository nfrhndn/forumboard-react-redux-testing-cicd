/**
 * Skenario pengujian:
 * - RegisterInput component
 *   - should call register with name, email, and password from user input
 */

import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterInput from './RegisterInput'

describe('RegisterInput component', () => {
  it('should call register with name, email, and password', async () => {
    const user = userEvent.setup()
    const register = vi.fn()
    render(<RegisterInput register={register} />)

    await user.type(screen.getByLabelText(/nama/i), 'Farhan')
    await user.type(screen.getByLabelText(/email/i), 'farhan@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /daftar/i }))

    expect(register).toHaveBeenCalledWith({
      name: 'Farhan',
      email: 'farhan@example.com',
      password: 'secret123'
    })
  })
})
