import { ActionType } from './action'

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads]
    case ActionType.INCREMENT_THREAD_COMMENT:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            totalComments: thread.totalComments + 1
          }
        }
        return thread
      })
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy
              : thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy
          }
        }
        return thread
      })
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy
              : thread.downVotesBy.concat([action.payload.userId])
          }
        }
        return thread
      })
    case ActionType.NEUTRALIZE_THREAD_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy:
              action.payload.voteType === 'down'
                ? thread.upVotesBy
                : thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy:
              action.payload.voteType === 'up'
                ? thread.downVotesBy
                : thread.downVotesBy.filter((id) => id !== action.payload.userId)
          }
        }
        return thread
      })
    case ActionType.RESTORE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.thread.id) {
          return action.payload.thread
        }
        return thread
      })
    default:
      return threads
  }
}

export default threadsReducer
