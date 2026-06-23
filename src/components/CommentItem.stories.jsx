import React from 'react'
import CommentItem from './CommentItem'

export default {
  title: 'Forum/CommentItem',
  component: CommentItem,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '720px', background: '#0a0a0a' }}>
        <Story />
      </div>
    )
  ],
  args: {
    id: 'comment-1',
    content:
      '<p>Setuju, flow Redux jadi jauh lebih jelas setelah sering bikin action dan reducer.</p>',
    createdAt: '2026-06-23T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'Farhan',
      avatar: 'https://ui-avatars.com/api/?name=Farhan&background=e00000&color=ffffff'
    },
    upVotesBy: ['user-2'],
    downVotesBy: [],
    authUser: 'user-2',
    upvote: () => {},
    downvote: () => {},
    neutralizeVote: () => {}
  }
}

export function Default(args) {
  return <CommentItem {...args} />
}

export function Reposted(args) {
  return <CommentItem {...args} upVotesBy={[]} downVotesBy={['user-2']} />
}
