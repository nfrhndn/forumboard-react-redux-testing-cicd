/**
 * Skenario pengujian:
 * - asyncSetAuthUser thunk
 *   - should save token and dispatch setAuthUserActionCreator when login succeeds
 *   - should call alert and not set auth user when login fails
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import { asyncSetAuthUser, setAuthUserActionCreator } from './action'

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn()
  }
}))

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should save token and dispatch auth user when login succeeds', async () => {
    const dispatch = vi.fn()
    const authUser = {
      id: 'user-1',
      name: 'Farhan',
      email: 'farhan@example.com',
      avatar: 'avatar.png'
    }
    api.login.mockResolvedValue('token-123')
    api.getOwnProfile.mockResolvedValue(authUser)

    await asyncSetAuthUser({ email: 'farhan@example.com', password: 'secret' })(dispatch)

    expect(api.putAccessToken).toHaveBeenCalledWith('token-123')
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(authUser))
  })

  it('should call alert and not set auth user when login fails', async () => {
    const dispatch = vi.fn()
    api.login.mockRejectedValue(new Error('Invalid credentials'))

    await asyncSetAuthUser({ email: 'wrong@example.com', password: 'wrong' })(dispatch)

    expect(alert).toHaveBeenCalledWith('Invalid credentials')
    expect(api.putAccessToken).not.toHaveBeenCalled()
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'SET_AUTH_USER' }))
  })
})
