import { createContext, useContext, useState } from 'react'

const FileContext = createContext<File | null>(null)
const FileActions = createContext<(file: File) => void>(() => {})

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null)

  return (
    <FileContext.Provider value={file}>
      <FileActions.Provider value={setFile}>{children}</FileActions.Provider>
    </FileContext.Provider>
  )
}

export const useFileContext = () => {
  return useContext(FileContext)
}

export const useFileActions = () => {
  return useContext(FileActions)
}
