import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem'

export default {
  title: 'Forum/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '720px', background: '#0a0a0a' }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  args: {
    id: 'thread-1',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: '<p>Coba ceritakan pengalaman kalian belajar Redux di Dicoding.</p>',
    category: 'redux',
    createdAt: '2026-06-23T00:00:00.000Z',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 4,
    user: {
      id: 'user-1',
      name: 'Dimas Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Dimas+Saputra&background=a98b7a&color=111111'
    },
    authUser: 'user-2',
    upvote: () => {},
    downvote: () => {},
    neutralizeVote: () => {}
  }
}

export function Default(args) {
  return <ThreadItem {...args} />
}

export function Reposted(args) {
  return <ThreadItem {...args} upVotesBy={[]} downVotesBy={['user-2']} />
}
