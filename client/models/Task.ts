export default interface Task {
  id: number
  description: string
  createdAt: Date
  completedAt: Date
  taskListId: number
}

export default interface TaskList {
  id: number
  Tasks: Task[]
}
