"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formSchemaLogin, LogInDataType } from './schema.login'
import {signIn} from 'next-auth/react'



export default function page() {

  // const router =  useRouter()

  const form =  useForm( {
  defaultValues : {
    email : "",
    password : "",
  },
  resolver : zodResolver(formSchemaLogin)
} )

  async function  handelLogIn(values : LogInDataType){
    console.log("values",values);

    signIn(  "credentials", { ...values , redirect : true , callbackUrl : "/" } )

    // const LogInOk = await LogInAction(values)
    
    // if(LogInOk){
    //   toast.success("successfully in log In",{
    //     position : "top-center",
    //     richColors : true,
    //   })
    //     // router.push("/")
      
    // }else{
    //   toast.error("error in log In",{
    //     position : "top-center",
    //     richColors : true
    //   })
    // }
  } 

  return <>

  <div className='bg-gray-300 mx-auto text-center w-10/12'>
    <h2 className='text-2xl'>signin</h2>

    <form action="" onSubmit={form.handleSubmit(handelLogIn)}>
        

        <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your email"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

        <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>password</FieldLabel>
            <Input
            type='password'
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your password"
              autoComplete="on"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />


      <Button className='text-xl w-full my-2 cursor-pointer p-2'> Log In Now</Button>

    </form>


  </div>
  
  </>
}
