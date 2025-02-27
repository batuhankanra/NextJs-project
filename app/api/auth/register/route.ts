
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'




    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export  async function POST(request:Request){
    const body=await request.json()
    
    const {name,email,password}=body

        if(!emailRegex.test(email)){
            return NextResponse.json({msg:'invalid email'},{status:400})
        }
        if(!passwordRegex.test(password)){
            console.log(passwordRegex.test(password))
            return NextResponse.json({msg:'wrong password'},{status:400})

        }
      
        const hashedPassword= bcrypt.hashSync(password,10)
        const existuser=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existuser){
            return NextResponse.json({msg:'boyle bir email var'},{status:401})
        }
        await prisma.user.create({
            data:{
                email,
                hashedPassword:hashedPassword,
                name
            }
        })
        return NextResponse.json({msg:'kayit basarili'},{status:200})


    
}