import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  INCREMENT_THREAD_COMMENT: 'INCREMENT_THREAD_COMMENT',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
  RESTORE_THREAD: 'RESTORE_THREAD'
}

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function incrementThreadCommentActionCreator(threadId) {
  return {
    type: ActionType.INCREMENT_THREAD_COMMENT,
    payload: {
      threadId
    }
  }
}

function upvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function downvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId
    }
  }
}

function neutralizeThreadVoteActionCreator({ threadId, userId, voteType = 'all' }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
      voteType
    }
  }
}

function restoreThreadActionCreator(thread) {
  return {
    type: ActionType.RESTORE_THREAD,
    payload: {
      thread
    }
  }
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
      return true
    } catch (error) {
      alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    const previousThread = threads.find((thread) => thread.id === threadId)
    dispatch(upvoteThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await api.upvoteThread(threadId)
    } catch (error) {
      alert(error.message)
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    const previousThread = threads.find((thread) => thread.id === threadId)
    dispatch(downvoteThreadActionCreator({ threadId, userId: authUser.id }))

    try {
      await api.downvoteThread(threadId)
    } catch (error) {
      alert(error.message)
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

function asyncNeutralizeThreadVote(threadId, voteType = 'all') {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    const previousThread = threads.find((thread) => thread.id === threadId)
    dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id, voteType }))

    try {
      await api.neutralizeThreadVote(threadId)
    } catch (error) {
      alert(error.message)
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  incrementThreadCommentActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  restoreThreadActionCreator,
  asyncAddThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote
}
