/**
 * Skenario pengujian:
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch receiveUsersActionCreator and receiveThreadsActionCreator when API succeeds
 *   - should call alert when API fails
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { asyncPopulateUsersAndThreads } from './action'

vi.mock('../../utils/api', () => ({
  default: {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn()
  }
}))

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should dispatch users and threads when API succeeds', async () => {
    const users = [{ id: 'user-1', name: 'Farhan', avatar: 'avatar.png' }]
    const threads = [{ id: 'thread-1', title: 'Thread', body: 'Body' }]
    const dispatch = vi.fn()
    api.getAllUsers.mockResolvedValue(users)
    api.getAllThreads.mockResolvedValue(threads)

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users))
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(threads))
  })

  it('should call alert when API fails', async () => {
    const dispatch = vi.fn()
    api.getAllUsers.mockRejectedValue(new Error('Network error'))

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(alert).toHaveBeenCalledWith('Network error')
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'RECEIVE_USERS' }))
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'RECEIVE_THREADS' }))
  })
})
