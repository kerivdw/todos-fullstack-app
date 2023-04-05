import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTasks } from '../actions/tasks'
import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

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
        <TaskList tasks={data} />
      </section>
      <Footer data={data} />
    </>
  )
}
export default App
