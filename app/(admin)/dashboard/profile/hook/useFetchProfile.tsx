import { useQuery } from '@tanstack/react-query'

interface Profile {
    id: number,
    photo: string,
    name: string,
    summary: string,
    no_wa: string,
    email: string,
    address: string,
    linkedin: string,
    github: string,
    portofolio: string,
    updatedAt: Date,
  }

export default function useFetchProfile () {
    const { data, error, isLoading, isSuccess } = useQuery<Profile[]>({
        queryKey: ['profile'],
        queryFn: async () => {
          const res = await fetch("/api/profile")
          const { data } = await res.json()
          return data
        }
      })

    return {
        data,
        error,
        isLoading,
        isSuccess,
    }
}