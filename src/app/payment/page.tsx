"use client"

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { shippingAddressType } from '@/types/order.types';
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { createCashOrder, createVisaOrder } from '../_actions/order.actions';
import { cartContext } from '../_context/CardContextProvider';
import { Button } from '@/components/ui/button';

export default function PaymentPage() {
  const form = useForm({
    defaultValues : {
      details : "",
      phone : "",
      city : "",
      postalCode : "",
      type : "cash",
    },

  })

  const {cartId} = useContext(cartContext)
  console.log( "cartId", cartId);
  

  async function handelPayment(value) {
    console.log(value);

    const userData : shippingAddressType = {
      shippingAddress : {
        city : value.city,
        details : value.details,
        phone : value.phone,
        postalCode : value.postalCode,
      }
    }

    if(value.type == "cash"){
      const res =  await createCashOrder(cartId , userData)
      console.log("cash order" , res);
      if(res?.status === "success") {
        alert("Order created successfully!");
        // Redirect or clear form
      } else {
        alert("Error creating order: " + (res?.message || "Unknown error"));
      }
      
    }else if (value.type == "visa"){
      const res = await createVisaOrder(cartId , userData)
      console.log("visa order response", res);
      if(res?.session?.url) {
        window.open(res.session.url)
      } else {
        console.error("Payment URL not found:", res);
        alert("Error: Payment session not created. Please try again.");
      }
      
    }
  }

  return <>

  <h1 className='text-center text-4xl my-10'>Payment</h1>
  <div className='container w-10/12 max-w-5xl mx-auto'>
    <form onSubmit={form.handleSubmit(handelPayment)} action="">

      <Controller
        name="details"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>details</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your details"
              autoComplete="off"
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

  <Controller
        name="postalCode"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>postalCode</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your postalCode"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
  <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>city</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="enter your city"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
  

      <h2 className=' my-1.5  mx-auto text-2xl'>Payment Method</h2>
        
        <div className="flex flex-col gap-3">

  <Controller
    name="type"
    control={form.control}
    render={({ field }) => (
      <>
        {[
          { label: "Cash on Delivery", value: "cash" },
          { label: "Pay Online (Visa)", value: "visa" }
        ].map((option) => (
          <label
            key={option.value}
            className={`
              border rounded-lg p-4 cursor-pointer
              ${field.value === option.value
                ? "bg-gray-100 border-black"
                : "border-gray-200"
              }
            `}
          >
            <input
              type="radio"
              className="hidden"
              value={option.value}
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </>
    )}
  />

</div>

      <Button 
        type="submit"
        className=" w-full  my-1.5 font-bold text-white py-3 cursor-pointer p-5 rounded-lg hover:bg-gray-800 transition-all"
        >
          Confirm Order
      </Button>
    </form>

  </div>
  
  
  
  </>
}
