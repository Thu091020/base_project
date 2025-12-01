export interface User {
  id: number
  name: string
}

export interface UserListResponse {
  page: number
  pageSize: number
  total: number
  data: User[]
}


