import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import PodcastPlayer from "@/components/PodcastPlayer";
import RightSidebar from "@/components/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import React from "react";

export default function RootLayout({
    children,
}: Readonly <{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col w-full h-full">
            <main className="relative flex bg-black-3 h-full">
                <LeftSidebar />
                <section className="border-2 border-red-500
                flex flex-col px-4 sm:px-14">
                    <div className="mx-auto flex w-full
                    max-w-5xl flex-col max-sm:px-4">
                        <div className="flex h-16 items-center justify-between
                        md:hidden">
                            <Image 
                            src="icons/logo.svg"
                            width={30}
                            height={30} 
                            alt="menu icon"/>

                            <MobileNav />
                        </div>
                        <div className="h-full overflow-y-auto">
                            <Toaster />
                            {children}
                        </div>
                    </div>
                </section>
                
                <RightSidebar />
            </main>

            <PodcastPlayer />
        </div>
    )
}