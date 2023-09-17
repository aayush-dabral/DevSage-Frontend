import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    
    return (
        <div>
            <main class="h-screen w-full flex flex-col justify-center items-center bg-[#000D15]">
                <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
                <div class="bg-[#1AA2D9] px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <button class="mt-5">
                    <a
                        class="relative inline-block text-sm font-medium text-[#1AA2D9] group active:text-blue-700 focus:outline-none focus:ring"
                    >
                        <span
                            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#1AA2D9] group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span onClick={()=> navigate('/')} class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            Go Home
                        </span>
                    </a>
                </button>
            </main>
        </div>
    )
}

export default PageNotFound
