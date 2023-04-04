import taskReducer, { TaskState } from '../tasksReducer'
import { setTasksSuccess } from '../../actions/tasks'
import { Task } from '../../../models/task'

const initialState: TaskState = {
  loading: false,
  error: undefined,
  data: [],
}

describe('taskReducer', () => {
  const tasks: Task[] = [
    {
      id: 1,
      description: 'Head To The Gym',
      createdAt: '2023-03-29T08:56:01.152Z',npm
      completedAt: null,
      taskListId: 1,
      isComplete: false,
    },
    {
      id: 2,
      description: 'Watch A Bad Movie',
      createdAt: '2023-03-28T08:56:01.152Z',
      completedAt: null,
      taskListId: 1,
      isComplete: false,
    },
  ]

  it('should get all tasks', async () => {
    const action = setTasksSuccess(tasks)
    const newState = taskReducer(initialState, action)
    expect(newState).toEqual(tasks)
  })
})
