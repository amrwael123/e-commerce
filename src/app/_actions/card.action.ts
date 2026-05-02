"use server";
import { promises } from "dns";
import { getMyToken } from "../utils/getMyToken";
import { CartResType } from "@/types/card.type";
import { count, log } from "console";
import { string } from "zod";

export async function addProductToCard(id: string): Promise<CartResType> {
  const token = await getMyToken();

  const res = fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    body: JSON.stringify({ productId: id }),

    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });
  const finalRes = (await res).json();
  console.log("add to card", finalRes);
  return finalRes;
}

export async function getMyUserCart(): Promise<CartResType> {
  const token = await getMyToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      headers: {
        token: token as string,
      },
    });
    const finalRes = await res.json();
    console.log(finalRes);

    if (!res.ok || !finalRes.cartId) {
      console.error("Cart fetch failed:", finalRes);
      return {
        cartId: "",
        message: "Cart not found",
        status: "fail",
        numOfCartItems: 0,
        data: { totalCartPrice: 0, products: [] },
      };
    }
    return finalRes;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      cartId: "",
      message: "Error fetching cart",
      status: "fail",
      numOfCartItems: 0,
      data: { totalCartPrice: 0, products: [] },
    };
  }
}

export async function deleteItemFromCart(
  productId: string,
): Promise<CartResType> {
  const token = await getMyToken();
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      headers: {
        token: token as string,
      },
      method: "DELETE",
    },
  );
  const finalRes = await res.json();
  return finalRes;
}

export async function deleteAllItemFromCart(): Promise<CartResType> {
  const token = await getMyToken();
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token: token as string,
    },
    method: "DELETE",
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function updateQuantityCart(
  productId: string,
  count: number,
): Promise<CartResType> {
  const token = await getMyToken();
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      method: "PUT",
      body: JSON.stringify({ count }),
    },
  );
  const finalRes = await res.json();
  return finalRes;
}
