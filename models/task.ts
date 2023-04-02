export interface NewTask {
  description: string
  createdAt: string
  completedAt?: string | null
  taskListId: number
}

export interface Task extends NewTask {
  id: number
  isComplete: boolean
}

export interface UpdatedTask extends Partial<Task> {
  description?: string
  completedAt?: string | null
  createdAt?: never
  taskListId?: never
}
