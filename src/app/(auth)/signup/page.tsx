"use client"

import MyInput from '@/app/_componets/MyInput'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { formSchemaSignUp, SignUpDataType } from '@/app/(auth)/signup/formSchemaSignUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from "zod"




export default function page() {

  const router =  useRouter()

  const form =  useForm( {
  defaultValues : {
    name : "",
    email : "",
    password : "",
    rePassword : "",
    phone : "",
  },
  resolver : zodResolver(formSchemaSignUp)
} )

  async function  handlsignup(values : SignUpDataType){
    console.log("values",values);

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
      body : JSON.stringify(values),
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const FinalRes = await res.json()
    console.log( "FinalRes", FinalRes );

    if(res.ok){
      toast.success("successfully in sign up",{
        position : "top-center",
        richColors : true,
      })
        router.push("/login")
      
    }else{
      toast.error("error in sign up",{
        position : "top-center",
        richColors : true
      })

    }
    


  } 

  return <>

  <div className='bg-gray-300 mx-auto text-center w-10/12'>
    <h2 className='text-2xl'>signin</h2>

    <form action="" onSubmit={form.handleSubmit(handlsignup)}>
        <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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

        <Controller
        name="rePassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>rePassword</FieldLabel>
            <Input
            type='password'
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your rePassword"
              autoComplete="on"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

        <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>phone</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your phone"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button className='text-xl w-full my-2 cursor-pointer p-2'> Sign Up Now</Button>

    </form>

    {/* <MyInput/> */}

  </div>
  
  </>
}
