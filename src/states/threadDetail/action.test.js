/**
 * Skenario pengujian:
 * - asyncAddComment thunk
 *   - should dispatch addCommentActionCreator and increment comment count when API succeeds
 *   - should call alert and return false when API fails
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import { addCommentActionCreator, asyncAddComment } from './action'

vi.mock('../../utils/api', () => ({
  default: {
    createComment: vi.fn()
  }
}))

describe('threadDetail thunk actions', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should dispatch add comment and increment comment count when API succeeds', async () => {
    const dispatch = vi.fn()
    const getState = vi.fn(() => ({
      threadDetail: {
        id: 'thread-1'
      }
    }))
    const newComment = {
      id: 'comment-new',
      content: 'Komentar baru',
      createdAt: '2026-06-23T00:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'Farhan',
        avatar: 'avatar.png'
      },
      upVotesBy: [],
      downVotesBy: []
    }
    api.createComment.mockResolvedValue(newComment)

    const result = await asyncAddComment({ content: 'Komentar baru' })(dispatch, getState)

    expect(result).toBe(true)
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(newComment))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'INCREMENT_THREAD_COMMENT',
      payload: {
        threadId: 'thread-1'
      }
    })
  })

  it('should call alert and return false when add comment API fails', async () => {
    const dispatch = vi.fn()
    const getState = vi.fn(() => ({
      threadDetail: {
        id: 'thread-1'
      }
    }))
    api.createComment.mockRejectedValue(new Error('Failed to create comment'))

    const result = await asyncAddComment({ content: 'Komentar baru' })(dispatch, getState)

    expect(result).toBe(false)
    expect(alert).toHaveBeenCalledWith('Failed to create comment')
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'ADD_COMMENT' }))
  })
})
