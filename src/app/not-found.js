import Link from "next/link";
import { CloudAlert } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound(){
    return (
        <>
            <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center my-50 font-outfit bg-background">
                <main className="flex flex-col gap-[20px] row-start-2 justify-items-center items-center">
                    <div className="flex flex-row items-center gap-3 text-7xl">
                        <CloudAlert className="w-10 h-10 sm:w-20 sm:h-20"></CloudAlert>
                        <h1 className="font-bold item-center text-7xl">Not Found</h1>
                    </div>
                    <p className="text-xl">The page you&apos;re looking for isn&apos;t here vro...</p>
                    <div className="flex gap-5">
                        <Link
                            className='text-background px-6 py-4 rounded-full duration-200 bg-primary hover:bg-foreground '
                            href='/'
                        >
                            Back to Home
                        </Link>
                        <Link
                            className='text-foreground px-6 py-4 rounded-full duration-200 bg-background border-2 border-primary hover:bg-secondary hover:text-background hover:border-transparent'
                            href='/login'
                        >
                            Log In
                        </Link>
                    </div>

                </main>
            </div>
        </>
    )
}