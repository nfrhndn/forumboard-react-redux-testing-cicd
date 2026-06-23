import { describe, expect, it } from 'vitest'
import threadDetailReducer from './reducer'
import {
  addCommentActionCreator,
  clearThreadDetailActionCreator,
  downvoteCommentActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeCommentVoteActionCreator,
  receiveThreadDetailActionCreator,
  restoreThreadDetailActionCreator,
  upvoteCommentActionCreator,
  upvoteThreadDetailActionCreator
} from './action'

const threadDetail = {
  id: 'thread-1',
  title: 'Halo Forum',
  body: 'Isi thread',
  category: 'general',
  createdAt: '2026-06-23T00:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'Farhan',
    avatar: 'https://example.com/avatar.png'
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2026-06-23T00:00:00.000Z',
      owner: {
        id: 'user-2',
        name: 'Dimas',
        avatar: 'https://example.com/dimas.png'
      },
      upVotesBy: [],
      downVotesBy: []
    }
  ]
}

describe('threadDetailReducer', () => {
  it('should receive thread detail', () => {
    const nextState = threadDetailReducer(null, receiveThreadDetailActionCreator(threadDetail))

    expect(nextState).toEqual(threadDetail)
  })

  it('should clear thread detail', () => {
    const nextState = threadDetailReducer(threadDetail, clearThreadDetailActionCreator())

    expect(nextState).toBeNull()
  })

  it('should upvote thread detail', () => {
    const nextState = threadDetailReducer(threadDetail, upvoteThreadDetailActionCreator('user-1'))

    expect(nextState.upVotesBy).toContain('user-1')
  })

  it('should downvote thread detail', () => {
    const nextState = threadDetailReducer(threadDetail, downvoteThreadDetailActionCreator('user-1'))

    expect(nextState.downVotesBy).toContain('user-1')
  })

  it('should add comment to the top of comments', () => {
    const newComment = { ...threadDetail.comments[0], id: 'comment-new', content: 'Komentar baru' }

    const nextState = threadDetailReducer(threadDetail, addCommentActionCreator(newComment))

    expect(nextState.comments[0]).toEqual(newComment)
    expect(nextState.comments).toHaveLength(2)
  })

  it('should upvote and downvote comment independently', () => {
    const afterUpvote = threadDetailReducer(
      threadDetail,
      upvoteCommentActionCreator({ commentId: 'comment-1', userId: 'user-1' })
    )
    const afterDownvote = threadDetailReducer(
      afterUpvote,
      downvoteCommentActionCreator({ commentId: 'comment-1', userId: 'user-1' })
    )

    expect(afterDownvote.comments[0].upVotesBy).toContain('user-1')
    expect(afterDownvote.comments[0].downVotesBy).toContain('user-1')
  })

  it('should neutralize selected comment vote type', () => {
    const votedDetail = {
      ...threadDetail,
      comments: [{ ...threadDetail.comments[0], upVotesBy: ['user-1'], downVotesBy: ['user-1'] }]
    }

    const nextState = threadDetailReducer(
      votedDetail,
      neutralizeCommentVoteActionCreator({
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'down'
      })
    )

    expect(nextState.comments[0].upVotesBy).toContain('user-1')
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1')
  })

  it('should restore previous thread detail after failed optimistic update', () => {
    const nextState = threadDetailReducer(null, restoreThreadDetailActionCreator(threadDetail))

    expect(nextState).toEqual(threadDetail)
  })
})
