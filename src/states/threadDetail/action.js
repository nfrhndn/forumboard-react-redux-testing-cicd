import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import {
  downvoteThreadActionCreator,
  incrementThreadCommentActionCreator,
  neutralizeThreadVoteActionCreator,
  restoreThreadActionCreator,
  upvoteThreadActionCreator
} from '../threads/action'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
  RESTORE_THREAD_DETAIL: 'RESTORE_THREAD_DETAIL'
}

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL
  }
}

function upvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId
    }
  }
}

function downvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId
    }
  }
}

function neutralizeThreadDetailVoteActionCreator({ userId, voteType = 'all' }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE,
    payload: {
      userId,
      voteType
    }
  }
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  }
}

function restoreThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RESTORE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function upvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId
    }
  }
}

function downvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId
    }
  }
}

function neutralizeCommentVoteActionCreator({ commentId, userId, voteType = 'all' }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      commentId,
      userId,
      voteType
    }
  }
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading())
    dispatch(clearThreadDetailActionCreator())
    try {
      const threadDetail = await api.getThreadDetail(threadId)
      dispatch(receiveThreadDetailActionCreator(threadDetail))
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

function asyncUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail, threads } = getState()
    const previousThreadDetail = threadDetail
    const previousThread = threads.find((thread) => thread.id === threadDetail.id)
    dispatch(upvoteThreadDetailActionCreator(authUser.id))
    dispatch(upvoteThreadActionCreator({ threadId: threadDetail.id, userId: authUser.id }))

    try {
      await api.upvoteThread(threadDetail.id)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

function asyncDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail, threads } = getState()
    const previousThreadDetail = threadDetail
    const previousThread = threads.find((thread) => thread.id === threadDetail.id)
    dispatch(downvoteThreadDetailActionCreator(authUser.id))
    dispatch(downvoteThreadActionCreator({ threadId: threadDetail.id, userId: authUser.id }))

    try {
      await api.downvoteThread(threadDetail.id)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

function asyncNeutralizeThreadDetailVote(voteType = 'all') {
  return async (dispatch, getState) => {
    const { authUser, threadDetail, threads } = getState()
    const previousThreadDetail = threadDetail
    const previousThread = threads.find((thread) => thread.id === threadDetail.id)
    dispatch(neutralizeThreadDetailVoteActionCreator({ userId: authUser.id, voteType }))
    dispatch(
      neutralizeThreadVoteActionCreator({
        threadId: threadDetail.id,
        userId: authUser.id,
        voteType
      })
    )

    try {
      await api.neutralizeThreadVote(threadDetail.id)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
      if (previousThread) {
        dispatch(restoreThreadActionCreator(previousThread))
      }
    }
  }
}

function asyncAddComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading())
    const { threadDetail } = getState()
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content })
      dispatch(addCommentActionCreator(comment))
      dispatch(incrementThreadCommentActionCreator(threadDetail.id))
      return true
    } catch (error) {
      alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()
    const previousThreadDetail = threadDetail
    dispatch(upvoteCommentActionCreator({ commentId, userId: authUser.id }))

    try {
      await api.upvoteComment(threadDetail.id, commentId)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
    }
  }
}

function asyncDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()
    const previousThreadDetail = threadDetail
    dispatch(downvoteCommentActionCreator({ commentId, userId: authUser.id }))

    try {
      await api.downvoteComment(threadDetail.id, commentId)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
    }
  }
}

function asyncNeutralizeCommentVote(commentId, voteType = 'all') {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState()
    const previousThreadDetail = threadDetail
    dispatch(neutralizeCommentVoteActionCreator({ commentId, userId: authUser.id, voteType }))

    try {
      await api.neutralizeCommentVote(threadDetail.id, commentId)
    } catch (error) {
      alert(error.message)
      dispatch(restoreThreadDetailActionCreator(previousThreadDetail))
    }
  }
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  addCommentActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  restoreThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncAddComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote
}
