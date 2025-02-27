'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page:React.FC = () => {
    const [email,setEmail]=React.useState<string>('')
    const [password,setPassword]=React.useState<string>('')
    const [response,setResponse]=React.useState<{message:string;type:'Success' | 'Error' | null}>({
      message:'',
      type:null
    })
    const router=useRouter()

    const handleSubmit =async (e:any)=>{
      e.preventDefault()
      await axios.post('/api/auth/register',{
        email,
        password
      }).then(()=>{
        signIn('credentials',{
          email,
          password,
          redirect:false
        }).then((callback)=>{
          if(callback?.ok){

            router.push('/')
            router.refresh()

          }
          if(callback?.error){
            const res:any=callback.error?.response
            setResponse({message:res,type:'Error'})

          }
        })
      }).catch((e)=>setResponse({message:e.response.data.msg,type:'Error'}))
      


    }

  return (
    <div className='container mx-auto mt-20 flex items-center justify-center  '>
      
      <form onSubmit={handleSubmit} className='w-[550px] flex flex-col items-center border-zinc-200 border shadow-2xl py-8  gap-y-4 '>
      <div className='p-2  w-[500px] font-semibold  text-2xl '>
        Register
      </div>
        {response.type && (
          <div className={`${response.type==='Error' ? 'bg-red-700' : 'bg-green-700'} text-white py-4 px-2 text-lg shadow-md w-[500px] capitalize rounded-md`}>
            {response.message}
          </div>
        )}
        <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' className=' w-[500px] text-lg rounded-md font-medium px-1 py-2 outline-none border border-zinc-300 focus:border-zinc-800 ' />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' className=' w-[500px] text-lg rounded-md font-medium px-1 py-2 outline-none border border-zinc-300 focus:border-zinc-800 '/>
        <button className='bg-indigo-400 hover:bg-indigo-600 px-2 py-3 rounded-md text-white w-[500px] cursor-pointer' type='submit'> Register</button>
      </form>
    </div>
  )
}

export default Page
