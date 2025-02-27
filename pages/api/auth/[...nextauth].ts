import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  bcrypt from 'bcrypt'
import {prisma} from '@/lib/prisma'
import { PrismaAdapter } from "@auth/prisma-adapter";



export const authOptions:AuthOptions ={
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            credentials:{
                email:{},
                password:{}
            },
            authorize:async (credentials)=>{
                
                if(!credentials?.email || !credentials?.password) throw new Error('Email yada password hatali')
                let user =await prisma.user.findUnique({ 
                    where:{
                        email:credentials.email
                    }
                })
                if(!user) throw new Error('Email yada password hatali')
                const passwordHash=  await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!passwordHash){
                    throw new Error(' password hatali')
                }
                return user
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
            }
            return token
        }
    },
    pages:{
        signIn:'/login'
    },
    debug:process.env.NODE_ENV==='development',
    secret:'sakjhdjakshdak'
}


 export default NextAuth(authOptions)