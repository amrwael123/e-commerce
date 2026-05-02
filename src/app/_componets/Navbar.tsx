"use client"

import  React, { useContext } from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Image } from "lucide-react"

// import logo from "../assets/images/freshCardLogo.png"
import logo from "@/images/freshCardLogo.png"

import { FaRegHeart, FaRegIdCard } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cartContext } from "../_context/CardContextProvider"
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

    export default function Navbar() {
        const {numberOfCartItem} = useContext( cartContext)

        const session = useSession()
        console.log( "session" ,session);

        function handelLogOut(){
            signOut( { redirect : true , callbackUrl : "/login"} )
        }
        
    return (

        <NavigationMenu className="bg-gray-100 max-w-none justify-between px-10 py-2">

        <div>
            <img src={logo.src} alt="" />
        </div>
        <div className="w-1/2">
            <input className="border  rounded-4xl py-3 px-3.5 w-full " placeholder="search products, Brands and more..." type="text" />
        </div>

        <NavigationMenuList className="text-2xl">

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/">Home</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/cart">Shop</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                    Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                </ListItem>
                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/brands">Brands</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/"><FaRegHeart/></Link>
            </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                <Link className="bg-transparent relative hover:bg-transparent" href="/cart">
                
                
                <span className="bg-red-500 text-white text-xs rounded-xl p-1 absolute right-0 -top-2"> {numberOfCartItem} </span>
                <FaCartShopping/>
                </Link>
            </NavigationMenuLink>
            </NavigationMenuItem>


            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/"><FaRegIdCard/></Link>
            </NavigationMenuLink>
            </NavigationMenuItem>


            { session.data ?  <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button className="bg-black! hover:bg-black! " onClick={handelLogOut}>logout</Button>
            </NavigationMenuLink>
            </NavigationMenuItem>
            :
            <>
            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/login">login</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent" href="/signup">signup</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>
            </>
            }

        </NavigationMenuList>

        </NavigationMenu>
    )
    }

    function ListItem({
    title,
    children,
    href,
    ...props
    }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
        <NavigationMenuLink asChild>
            <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
                <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div>
            </Link>
        </NavigationMenuLink>
        </li>
    )
    }
