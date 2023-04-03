import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addNewTask } from '../actions/tasks'
import { Task, NewTask } from '../../models/task'

function AddTask() {
  const [newDescription, setNewDescription] = useState('')
  const dispatch = useAppDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const description = event.target.value
    setNewDescription(description)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    dispatch(
      addNewTask({
        description: newDescription,
        createdAt: new Date().toISOString(),
        completedAt: null,
        taskListId: 1,
      })
    )
    setNewDescription('')
  }

  return (
    <form onSubmit={handleSubmit} data-testid="add-task-form">
      <input
        role="text"
        type="text"
        name="add-task"
        id="add-task"
        className="new-todo"
        value={newDescription || ''}
        placeholder="What needs to be done?"
        autoFocus={true}
        onChange={handleChange}
      />
    </form>
  )
}

export default AddTask
