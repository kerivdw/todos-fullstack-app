import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useDispatch } from 'react-redux'
import { setTaskSuccess } from '../actions/task'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [task, setTask] = useState([
    {
      id: 1,
      description: 'Task 1',
      createdAt: '2023-04-01',
      completedAt: null,
      taskListId: 1,
    },
    {
      id: 2,
      description: 'Task 2',
      createdAt: '2023-04-01',
      completedAt: null,
      taskListId: 1,
    },
    {
      id: 3,
      description: 'Task 3',
      createdAt: '2023-04-01',
      completedAt: '2023-04-01',
      taskListId: 1,
    },
  ])

  useEffect(() => {
    dispatch(setTaskSuccess(task))
  }, [dispatch, task])

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask />
      </header>
      <section className="main">
        <input className="toggle-all" type="text" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList tasks={data} />
      </section>
      <Footer />
    </>
  )
}

export default App
