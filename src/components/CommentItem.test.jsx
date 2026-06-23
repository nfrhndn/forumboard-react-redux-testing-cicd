import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommentItem from './CommentItem'

const comment = {
  id: 'comment-1',
  content: '<p>Setuju, Redux jadi lebih mudah setelah paham flow-nya.</p>',
  createdAt: '2026-06-23T00:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'Farhan',
    avatar: 'https://example.com/avatar.png'
  },
  upVotesBy: [],
  downVotesBy: []
}

describe('CommentItem component', () => {
  it('should render comment owner and content', () => {
    render(
      <CommentItem
        {...comment}
        authUser="user-2"
        upvote={vi.fn()}
        downvote={vi.fn()}
        neutralizeVote={vi.fn()}
      />
    )

    expect(screen.getByText('Farhan')).toBeInTheDocument()
    expect(
      screen.getByText('Setuju, Redux jadi lebih mudah setelah paham flow-nya.')
    ).toBeInTheDocument()
  })

  it('should call downvote when repost button is clicked', async () => {
    const user = userEvent.setup()
    const downvote = vi.fn()
    render(
      <CommentItem
        {...comment}
        authUser="user-2"
        upvote={vi.fn()}
        downvote={downvote}
        neutralizeVote={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /downvote comment/i }))

    expect(downvote).toHaveBeenCalledWith('comment-1')
  })
})
