import taskReducer, { TaskState } from '../tasksReducer'
import {
  addTaskSuccess,
  deleteCompletedTaskSuccess,
  deleteTaskSuccess,
  setTasksSuccess,
  updateTaskSuccess,
} from '../../actions/tasks'
import { Task } from '../../../models/task'

const initialState: TaskState = {
  loading: false,
  error: undefined,
  data: [] as Task[],
}

describe('taskReducer tests', () => {
  const tasks: Task[] = [
    {
      id: 1,
      description: 'Head To The Gym',
      createdAt: '2023-03-29T08:56:01.152Z',
      completedAt: null,
      isComplete: false,
      taskListId: 1,
    },
    {
      id: 2,
      description: 'Watch A Bad Movie',
      createdAt: '2023-03-28T08:56:01.152Z',
      completedAt: null,
      isComplete: false,
      taskListId: 1,
    },
  ]

  it('should get all tasks', async () => {
    const action = setTasksSuccess(tasks)
    const newState = taskReducer(initialState, action)

    expect(newState.data).toEqual(tasks)
  })

  it('should add a task', () => {
    const task: Task = {
      id: 1,
      description: 'Head To The Gym',
      createdAt: '2023-03-29T08:56:01.152Z',
      completedAt: null,
      isComplete: false,
      taskListId: 1,
    }
    const action = addTaskSuccess(task)
    const newState = taskReducer(initialState, action)
    expect(newState.data).toEqual([task])
  })

  it('should update a task', () => {
    //Arrange
    const task: Task = {
      id: 1,
      description: 'Head To The Gym',
      createdAt: '2023-03-29T08:56:01.152Z',
      completedAt: null,
      isComplete: false,
      taskListId: 1,
    }

    const addTaskAction = addTaskSuccess(task)

    const updateTask: Task = {
      id: 1,
      description: 'Head To The Gym',
      createdAt: '2023-03-29T08:56:01.152Z',
      completedAt: '2023-03-29T08:56:01.152Z',
      isComplete: true,
      taskListId: 1,
    }
    const updateTaskAction = updateTaskSuccess(updateTask)

    //Act
    const newStateAfterAdd = taskReducer(initialState, addTaskAction)
    const newStateAfterUpdate = taskReducer(newStateAfterAdd, updateTaskAction)

    //Assert
    expect(newStateAfterAdd.data).toEqual([task])
    expect(newStateAfterUpdate.data).toEqual([
      {
        id: 1,
        description: 'Head To The Gym',
        createdAt: '2023-03-29T08:56:01.152Z',
        completedAt: '2023-03-29T08:56:01.152Z',
        isComplete: true,
        taskListId: 1,
      },
    ])
  })

  it('should delete a task', () => {
    const tasks: Task[] = [
      {
        id: 1,
        description: 'Head To The Gym',
        createdAt: '2023-03-29T08:56:01.152Z',
        completedAt: null,
        isComplete: false,
        taskListId: 1,
      },
      {
        id: 2,
        description: 'Watch A Bad Movie',
        createdAt: '2023-03-28T08:56:01.152Z',
        completedAt: null,
        isComplete: false,
        taskListId: 1,
      },
    ]

    const initial: TaskState = {
      loading: false,
      error: undefined,
      data: tasks,
    }

    const action = deleteTaskSuccess('1')
    const newState = taskReducer(initial, action)
    expect(newState.data).toEqual([
      {
        id: 2,
        description: 'Watch A Bad Movie',
        createdAt: '2023-03-28T08:56:01.152Z',
        completedAt: null,
        isComplete: false,
        taskListId: 1,
      },
    ])
  })

  it('should delete all completed tasks', () => {
    const tasks: Task[] = [
      {
        id: 1,
        description: 'Head To The Gym',
        createdAt: '2023-03-29T08:56:01.152Z',
        completedAt: '2023-03-29T08:56:01.152Z',
        isComplete: true,
        taskListId: 1,
      },
      {
        id: 2,
        description: 'Watch A Bad Movie',
        createdAt: '2023-03-28T08:56:01.152Z',
        completedAt: null,
        isComplete: false,
        taskListId: 1,
      },
    ]
  
    const initial: TaskState = {
      loading: false,
      error: undefined,
      data: tasks,
    }
  
    const action = deleteCompletedTaskSuccess()
    const newState = taskReducer(initial, action)
  
    expect(newState.data).toEqual([
      {
        completedAt: null,
        id: 2,
        description: 'Watch A Bad Movie',
        createdAt: '2023-03-28T08:56:01.152Z',
        isComplete: false,
        taskListId: 1,
      },
    ])
  })
})
