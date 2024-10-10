"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default  function VerifyEmail() {
  const[token , setToken] = useState("") 
  const[verified , setVerified] = useState(false)


  const verifyUserEmail = async () =>{
    try {
      await axios.post("/api/users/verifyemail",
        {token})
        setVerified(true)
    } catch (error: unknown) { // Set error as `unknown` type
      // Check if error is an instance of AxiosError
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An unexpected error occurred";
        console.log("Login failed", message);
        toast.error(message);
      } else {
        // Handle non-Axios errors
        console.log("Login failed", error);
        toast.error("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "" )
    // const {query} = router;
    // const urlTokenTwo = query.token
  },[])

  useEffect(()=>{
    if (token.length > 0){
      verifyUserEmail()
    }
  },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-800'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Error</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  )
}

