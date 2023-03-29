export interface NewTask {
  description: string
  createdAt: Date
  completedAt: Date
  taskListId: number
}

export interface Task extends NewTask {
  id: number
}

export interface UpdatedTask extends Partial<Task> {
  createdAt?: never
  taskListId?: never
}

export interface TaskList {
  id: number
  Tasks: Task[]
}
