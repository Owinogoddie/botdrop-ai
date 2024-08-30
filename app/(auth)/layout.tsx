import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
    const user = await getUser()
    if (user) {
        console.log(user)
      return redirect('/dashboard')
    }
  return (
    <div>{children}</div>
  )
}

export default Layout