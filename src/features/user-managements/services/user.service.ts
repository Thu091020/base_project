import type { UserListResponse } from '../types'

export const userService = {
  getAll: async (): Promise<UserListResponse> => {
    // Demo mock; sau này thay bằng apiClient.get<UserListResponse>(userEndpoints.getUserList)
    return Promise.resolve({
      page: 1,
      pageSize: 10,
      total: 2,
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    })
  },
}