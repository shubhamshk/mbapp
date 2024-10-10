"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter()
  const[user , setUser ] =useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled ,setButtonDisabled] = useState(false)
  const[loading , setLoading] = useState(false)

  const onSignup = async () =>{
    try {
      setLoading(true)
      const response = axios.post("/api/users/signup" , user)
      console.log("Signup success" , response.data);
      router.push('/login')

    } catch (error:any) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length >0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-600'>
      <h1>{loading ? "processing" : "signup"}
      </h1>
      <label htmlFor = "username">username</label>
      <input className='text-black' id = 'username' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="username" type='text' />
      <label htmlFor = "email">email</label>
      <input className='text-black' id = 'email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email" type='text' />
      <label htmlFor = "password">password</label>
      <input className='text-black' id = 'password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password" type='text' />
      <button  onClick = {onSignup} className=' mt-2 p-1 bg-red-400'>
        {buttonDisabled ? "No Signup" :"Sign up"}
      </button>
      <Link href="/login">Visit login Page</Link>
    </div>
  )
}

