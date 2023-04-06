import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTasks } from '../actions/tasks'
import { useEffect } from 'react'

import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const { filter } = useAppSelector((state) => state.filters)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const filteredTasks =
    filter === 'all'
      ? data
      : data.filter((task) =>
          filter === 'active' ? !task.isComplete : task.isComplete
        )

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>There was an error</p>
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask />
      </header>
      <section className="main">
        <input className="toggle-all" type="text" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList tasks={filteredTasks} />
      </section>
      <Footer data={filteredTasks} />
    </>
  )
}
export default App
