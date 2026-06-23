/**
 * Skenario pengujian:
 * - asyncAddThread thunk
 *   - should dispatch addThreadActionCreator and return true when API succeeds
 *   - should call alert and return false when API fails
 * - asyncUpvoteThread thunk
 *   - should rollback optimistic update when API fails
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import {
  addThreadActionCreator,
  asyncAddThread,
  asyncUpvoteThread,
  restoreThreadActionCreator
} from './action'

vi.mock('../../utils/api', () => ({
  default: {
    createThread: vi.fn(),
    upvoteThread: vi.fn()
  }
}))

describe('threads thunk actions', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should dispatch add thread and return true when API succeeds', async () => {
    const dispatch = vi.fn()
    const newThread = {
      id: 'thread-new',
      title: 'Thread Baru',
      body: 'Isi thread',
      category: 'redux'
    }
    api.createThread.mockResolvedValue(newThread)

    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread',
      category: 'redux'
    })(dispatch)

    expect(result).toBe(true)
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(newThread))
  })

  it('should call alert and return false when add thread API fails', async () => {
    const dispatch = vi.fn()
    api.createThread.mockRejectedValue(new Error('Failed to create thread'))

    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread',
      category: 'redux'
    })(dispatch)

    expect(result).toBe(false)
    expect(alert).toHaveBeenCalledWith('Failed to create thread')
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'ADD_THREAD' }))
  })

  it('should rollback optimistic thread vote when API fails', async () => {
    const dispatch = vi.fn()
    const previousThread = {
      id: 'thread-1',
      title: 'Thread',
      body: 'Body',
      upVotesBy: [],
      downVotesBy: []
    }
    const getState = vi.fn(() => ({
      authUser: { id: 'user-1' },
      threads: [previousThread]
    }))
    api.upvoteThread.mockRejectedValue(new Error('Failed to fetch'))

    await asyncUpvoteThread('thread-1')(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'UPVOTE_THREAD' }))
    expect(dispatch).toHaveBeenCalledWith(restoreThreadActionCreator(previousThread))
    expect(alert).toHaveBeenCalledWith('Failed to fetch')
  })
})
