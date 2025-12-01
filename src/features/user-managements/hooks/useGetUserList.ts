import { useQuery } from '@tanstack/react-query'
import { usePagination } from '../../../hooks/usePagination.ts'
import { userService } from '../services'
import type { UserListResponse } from '../types'

export const useGetUserList = (DEFAULT_PAGE_NUMBER = 1, DEFAULT_PAGE_SIZE = 20) => {
  const pagination = usePagination(DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)

  const { data, isPending, error, isLoading, refetch } = useQuery<UserListResponse>({
    queryKey: ['user-list', pagination.page, pagination.pageSize],
    queryFn: async () => {
      const response = await userService.getAll()
      pagination.setPage(response.page)
      pagination.setPageSize(response.pageSize)
      pagination.setTotal(response.total)
      return response
    },
  })

  return {
    data,
    pagination,
    isPending,
    isLoading,
    error,
    refetch,
  }
}
