import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThreadItem from './ThreadItem'

const thread = {
  id: 'thread-1',
  title: 'Bagaimana pengalamanmu belajar Redux?',
  body: '<p>Ceritakan pengalaman belajar Redux.</p>',
  category: 'redux',
  createdAt: '2026-06-23T00:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
  user: {
    id: 'user-1',
    name: 'Dimas Saputra',
    avatar: 'https://example.com/avatar.png'
  }
}

function renderThreadItem(props = {}) {
  return render(
    <MemoryRouter>
      <ThreadItem
        {...thread}
        authUser="user-2"
        upvote={vi.fn()}
        downvote={vi.fn()}
        neutralizeVote={vi.fn()}
        {...props}
      />
    </MemoryRouter>
  )
}

describe('ThreadItem component', () => {
  it('should render thread identity, title, body, and comment count', () => {
    renderThreadItem()

    expect(screen.getByText('Dimas Saputra')).toBeInTheDocument()
    expect(screen.getByText('Bagaimana pengalamanmu belajar Redux?')).toBeInTheDocument()
    expect(screen.getByText('Ceritakan pengalaman belajar Redux.')).toBeInTheDocument()
    expect(screen.getByLabelText(/buka komentar/i)).toHaveTextContent('3')
  })

  it('should call upvote when heart button is clicked', async () => {
    const user = userEvent.setup()
    const upvote = vi.fn()
    renderThreadItem({ upvote })

    await user.click(screen.getByRole('button', { name: /upvote thread/i }))

    expect(upvote).toHaveBeenCalledWith('thread-1')
  })

  it('should neutralize upvote when already upvoted', async () => {
    const user = userEvent.setup()
    const neutralizeVote = vi.fn()
    renderThreadItem({ upVotesBy: ['user-2'], neutralizeVote })

    await user.click(screen.getByRole('button', { name: /upvote thread/i }))

    expect(neutralizeVote).toHaveBeenCalledWith('thread-1', 'up')
  })
})
