/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useEffect, useState } from 'react'
import { socket } from './socket'

const SocketContext = createContext(socket)

export function SocketProvider ({ children }: { children: React.ReactNode }) {
  // const { isConnected, fooEvents } = useSocket()
  // console.log({ isConnected, fooEvents })
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default function useSocket () {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState<any>([])

  const onConnect = useCallback(() => {
    setIsConnected(true)
  }, [])

  const onDisconnect = useCallback(() => {
    setIsConnected(false)
  }, [])

  const onFooEvent = useCallback((value: any) => {
    setFooEvents((previous: any) => [...previous, value])
  }, [])

  useEffect(function connectSocket () {
    socket.connect()
    return () => {
      socket.off('connect', onConnect)
    }
  }, [])

  useEffect(function disconnectSocket () {
    socket.on('disconnect', onDisconnect)
    return () => {
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  useEffect(function fooEvent () {
    socket.on('foo', onFooEvent)

    return () => {
      socket.off('foo', onFooEvent)
    }
  }, [])

  return { isConnected, fooEvents }
}
