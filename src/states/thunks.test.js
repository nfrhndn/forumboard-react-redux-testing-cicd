import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../utils/api'
import { receiveUsersActionCreator } from './users/action'
import {
  addThreadActionCreator,
  asyncAddThread,
  asyncUpvoteThread,
  receiveThreadsActionCreator,
  restoreThreadActionCreator
} from './threads/action'
import { asyncPopulateUsersAndThreads } from './shared/action'
import { asyncSetAuthUser, setAuthUserActionCreator } from './authUser/action'
import { addCommentActionCreator, asyncAddComment } from './threadDetail/action'

vi.mock('../utils/api', () => ({
  default: {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn(),
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
    createThread: vi.fn(),
    createComment: vi.fn(),
    upvoteThread: vi.fn()
  }
}))

describe('async thunk actions', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should dispatch users and threads when asyncPopulateUsersAndThreads succeeds', async () => {
    const users = [{ id: 'user-1', name: 'Farhan', avatar: 'avatar.png' }]
    const threads = [{ id: 'thread-1', title: 'Thread', body: 'Body' }]
    const dispatch = vi.fn()
    api.getAllUsers.mockResolvedValue(users)
    api.getAllThreads.mockResolvedValue(threads)

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users))
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(threads))
  })

  it('should dispatch auth user and save token when asyncSetAuthUser succeeds', async () => {
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

  it('should dispatch add thread and return true when asyncAddThread succeeds', async () => {
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

  it('should dispatch add comment and increment comment count when asyncAddComment succeeds', async () => {
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

  it('should rollback optimistic thread vote when asyncUpvoteThread fails', async () => {
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

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'UPVOTE_THREAD'
      })
    )
    expect(dispatch).toHaveBeenCalledWith(restoreThreadActionCreator(previousThread))
    expect(alert).toHaveBeenCalledWith('Failed to fetch')
  })
})
