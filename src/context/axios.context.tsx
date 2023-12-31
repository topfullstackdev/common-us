import { ReactNode, createContext, useMemo } from 'react'
import axios, { AxiosInstance } from 'axios'

import { useContextFallback } from '../hooks'

const baseUrl = 'https://api.github.com'

const AxiosContext = createContext<AxiosInstance | undefined>(axios)
AxiosContext.displayName = 'AxiosContext'

interface AxiosProviderProps {
  children: ReactNode
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const value = useMemo(() => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization:
          `Bearer ${process.env.REACT_APP_GIT_TOKEN}`,
      },
    })

    return instance
  }, [])

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
}

export const useAxios = () => useContextFallback(AxiosContext)
