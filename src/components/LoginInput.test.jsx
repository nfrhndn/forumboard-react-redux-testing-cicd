/**
 * Skenario pengujian:
 * - LoginInput component
 *   - should call login with email and password from user input
 */

import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginInput from './LoginInput'

describe('LoginInput component', () => {
  it('should call login with email and password', async () => {
    const user = userEvent.setup()
    const login = vi.fn()
    render(<LoginInput login={login} />)

    await user.type(screen.getByLabelText(/email/i), 'farhan@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /masuk/i }))

    expect(login).toHaveBeenCalledWith({
      email: 'farhan@example.com',
      password: 'secret123'
    })
  })
})
