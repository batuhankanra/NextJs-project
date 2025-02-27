'use client'
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
      signIn('credentials',{
        email,
        password,
        redirect:false
      }).then((callback)=>{
        if(callback?.ok){
          setResponse({message:'Giris basarili',type:'Success'})
          setTimeout(()=>{
            router.push('/')
            router.refresh()
          },3000)
        }
        if(callback?.error){
          setResponse({message:callback.error,type:'Error'})
          console.log(callback.error)
        }
      })


    }

  return (
    <div className='container mx-auto mt-20 flex items-center justify-center  '>
      
      <form onSubmit={handleSubmit} className='w-[550px] p-5 flex flex-col items-center border-zinc-200 border shadow-2xl py-8  gap-y-4 '>
      <div className='p-2  w-full font-semibold  text-2xl '>
        Login
      </div>
        {response.type && (
          <div className={`${response.type==='Error' ? 'bg-red-700' : 'bg-green-700'} text-white py-4 px-2 text-lg shadow-md w-full capitalize rounded-md`}>
            {response.message}
          </div>
        )}
        <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' className=' w-full text-lg rounded-md font-medium px-1 py-2 outline-none border border-zinc-300 focus:border-zinc-800 ' />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' className=' w-full text-lg rounded-md font-medium px-1 py-2 outline-none border border-zinc-300 focus:border-zinc-800 '/>
        <button className='bg-indigo-400 hover:bg-indigo-600 px-2 py-3 rounded-md text-white w-full cursor-pointer' type='submit'> Login</button>
      </form>
    </div>
  )
}

export default Page
