'use client'

import { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext(null)

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000')
    setSocket(socketInstance)

    return () => {
      socketInstance.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}