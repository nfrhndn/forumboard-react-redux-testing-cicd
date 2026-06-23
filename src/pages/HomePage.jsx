import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import ThreadList from '../components/ThreadList'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import {
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote
} from '../states/threads/action'

function HomePage({ openComposer }) {
  const { threads, users, authUser } = useSelector((states) => states)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const onUpvote = (id) => {
    dispatch(asyncUpvoteThread(id))
  }

  const onDownvote = (id) => {
    dispatch(asyncDownvoteThread(id))
  }

  const onNeutralizeVote = (id, voteType) => {
    dispatch(asyncNeutralizeThreadVote(id, voteType))
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {}
  }))

  const categories = Array.from(
    new Set(threadList.map((thread) => thread.category).filter(Boolean))
  )
  const filteredThreads = filter
    ? threadList.filter((thread) => thread.category === filter)
    : threadList

  return (
    <section className="feed-page">
      <header className="feed-topbar">
        <h1>For you</h1>
      </header>

      <button type="button" className="composer-prompt" onClick={openComposer}>
        <img className="avatar avatar-sm" src={authUser.avatar} alt={authUser.name} />
        <span>What's new?</span>
        <strong>Post</strong>
      </button>

      <div className="topic-strip">
        <button
          type="button"
          onClick={() => setFilter('')}
          className={`topic-chip ${filter === '' ? 'active' : ''}`}
        >
          For you
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setFilter(filter === category ? '' : category)}
            className={`topic-chip ${filter === category ? 'active' : ''}`}
          >
            #{category}
          </button>
        ))}
      </div>

      <ThreadList
        threads={filteredThreads}
        authUser={authUser.id}
        upvote={onUpvote}
        downvote={onDownvote}
        neutralizeVote={onNeutralizeVote}
      />
    </section>
  )
}

HomePage.propTypes = {
  openComposer: PropTypes.func.isRequired
}

export default HomePage
