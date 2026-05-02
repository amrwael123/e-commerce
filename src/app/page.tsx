import { Images } from 'lucide-react';
import MySlider from './_componets/MySlider';
import ProductCard from './_componets/ProductCard';
import { getAllProduct } from '@/services/Products';
// import ShopByCategory from './_componets/ShopByCategory';

import image1 from '@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import image2 from '@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import image3 from '@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import { lazy, Suspense } from 'react';
import {  getMyToken } from './utils/getMyToken';


const ShopByCategoryAsLazy = lazy( ()=> import("./_componets/ShopByCategory") ) 

const images = [image1.src,image2.src ,image3.src]

export  default async function Home() {

  const Products = await getAllProduct() //    home page
  
  getMyToken()

  return <>

  <MySlider  listOfImages={images} slidesPerView={1}/>

  <Suspense fallback={ <div className='w-full  bg-gray-200 text-center text-2xl'> loading... </div> }>
    <ShopByCategoryAsLazy/>
  </Suspense>

  <h2 className='w-10/12 mx-auto text-2xl font-semibold mt-3' >products</h2>
  
  <div className='container w-10/12 mx-auto bg-slate-50 p-5 grid gap-5 md:grid-cols-4 xl:grid-cols-5 '>

    {Products?.map((product)=> <ProductCard key={product.id} product={product}/> ) }

  </div>

  </>
}
