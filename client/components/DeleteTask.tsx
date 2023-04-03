import { useAppDispatch } from '../hooks'
import { removeTask } from '../actions/tasks'

interface Props {
  id: number
}

function DeleteTask(props: Props) {
  const dispatch = useAppDispatch()
  const buttonId = String(props.id)

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    const id = event.currentTarget.id
    dispatch(removeTask(id))
  }

  return (
    <button id={buttonId} className="destroy" onClick={handleClick}></button>
  )
}

export default DeleteTask
