/**
 * Skenario pengujian:
 * - threadsReducer
 *   - should return initial state when action is unknown
 *   - should receive, add, and restore thread data
 *   - should update comment count
 *   - should update upvote, downvote, and neutralize vote state
 */

import { describe, expect, it } from 'vitest'
import threadsReducer from './reducer'
import {
  addThreadActionCreator,
  downvoteThreadActionCreator,
  incrementThreadCommentActionCreator,
  neutralizeThreadVoteActionCreator,
  receiveThreadsActionCreator,
  restoreThreadActionCreator,
  upvoteThreadActionCreator
} from './action'

const initialThreads = [
  {
    id: 'thread-1',
    title: 'Belajar Redux',
    body: 'Diskusi Redux',
    category: 'redux',
    createdAt: '2026-06-23T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 1
  }
]

describe('threadsReducer', () => {
  it('should return the initial state when action is unknown', () => {
    const nextState = threadsReducer(initialThreads, { type: 'UNKNOWN' })

    expect(nextState).toEqual(initialThreads)
  })

  it('should receive threads', () => {
    const threads = [{ ...initialThreads[0], id: 'thread-2' }]

    const nextState = threadsReducer([], receiveThreadsActionCreator(threads))

    expect(nextState).toEqual(threads)
  })

  it('should add a new thread to the top of list', () => {
    const newThread = { ...initialThreads[0], id: 'thread-new', title: 'Thread Baru' }

    const nextState = threadsReducer(initialThreads, addThreadActionCreator(newThread))

    expect(nextState[0]).toEqual(newThread)
    expect(nextState).toHaveLength(2)
  })

  it('should increment total comments on selected thread', () => {
    const nextState = threadsReducer(
      initialThreads,
      incrementThreadCommentActionCreator('thread-1')
    )

    expect(nextState[0].totalComments).toBe(2)
  })

  it('should upvote a thread without changing downvotes', () => {
    const nextState = threadsReducer(
      initialThreads,
      upvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    )

    expect(nextState[0].upVotesBy).toContain('user-1')
    expect(nextState[0].downVotesBy).toEqual([])
  })

  it('should downvote a thread without changing upvotes', () => {
    const nextState = threadsReducer(
      initialThreads,
      downvoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    )

    expect(nextState[0].upVotesBy).toContain('user-2')
    expect(nextState[0].downVotesBy).toContain('user-1')
  })

  it('should neutralize only selected vote type', () => {
    const votedThreads = [
      {
        ...initialThreads[0],
        upVotesBy: ['user-1'],
        downVotesBy: ['user-1']
      }
    ]

    const nextState = threadsReducer(
      votedThreads,
      neutralizeThreadVoteActionCreator({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'up'
      })
    )

    expect(nextState[0].upVotesBy).not.toContain('user-1')
    expect(nextState[0].downVotesBy).toContain('user-1')
  })

  it('should restore a thread after failed optimistic update', () => {
    const optimisticThreads = [{ ...initialThreads[0], upVotesBy: ['user-1', 'user-2'] }]

    const nextState = threadsReducer(
      optimisticThreads,
      restoreThreadActionCreator(initialThreads[0])
    )

    expect(nextState).toEqual(initialThreads)
  })
})
