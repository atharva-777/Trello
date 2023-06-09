"use client";

import React, { useEffect, useState } from 'react'

import { account, getUserData,logout } from '@/appwrite'

const Home = () => {

    const [user,setUser] = useState("")

    useEffect(()=>{
        getUserData()
            .then((account)=>setUser(account.email))
            .catch(()=>alert('Something went wrong'))
    },[])

    const handleLogOut = () => logout().then(()=>alert('logged out'))

    if(!user)return <h1>You are not logged in</h1>

  return (
    <div>

      {!user? <h1>You are logged out</h1>:null}

    <h1>you are logged in as {user}</h1>
    <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Home