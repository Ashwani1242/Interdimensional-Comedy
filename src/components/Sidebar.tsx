import { Link, NavLink, useNavigate } from "react-router-dom"
import MainIcon from "../icons/MainIcon"
import PrimaryButton from "./utils/PrimaryButton"
import { useEffect, useState } from "react"


function Sidebar() {

    const [loggedInUser, setLoggedInUser] = useState('')
    const [isMenuOpen, setisMenuOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUserEmail') || 'No User')
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        localStorage.removeItem('loggedInUserEmail')

        navigate('/')
    }

    // const Line = <div className='h-fit w-full py-2/'> <div className='w-full h-[2px] bg-white/50' /> </div>


    const Line = () => (<div className='h-fit w-full py-2/'> <div className='w-full h-[1px] bg-white/30' /> </div>);

    return (
        !isMenuOpen ?
            (<div className="fixed top-4 left-4 z-50 bg-neutral-800 p-2 rounded-xl">
                <button onClick={() => setisMenuOpen(val => !val)} className="flex justify-center items-center cursor-pointer">
                    <MainIcon />
                </button>
            </div>)
            :
            (<div
                // style={{ backgroundColor: color }}
                className={`flex flex-col justify-between bg-neutral-900/ bg-neutral-900 z-50 text-sm text-nowrap fixed/ items-start w-fit px-8 py-4 h-screen`}>
                <div className="flex flex-col justify-center items-start gap-y-4">
                    <button onClick={() => setisMenuOpen(val => !val)} className="flex justify-center items-center gap-x-4 cursor-pointer py-4">



                        <MainIcon />
                        <div className='text-xl uppercas md:block hidden font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent'>
                            VibeVision AI <span className="text-xs text-white font-normal">v6</span>
                        </div>


                    </button>

                    <Line />

                    <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg pt-4/ cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Explore</NavLink>

                    <Line />

                    <NavLink to={'/create'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg pt-4/ cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Create</NavLink>


                    <NavLink to={'/create/video'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg/ pl-4 cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Video</NavLink>

                    {/* <Line />s */}

                    <NavLink to={'/create/music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg/ pl-4 cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Music</NavLink>

                    <Line />

                    {/* <NavLink to={'/kids-music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Kid's Music</NavLink> */}
                    <NavLink to={'/pricing'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Pricing</NavLink>

                    {localStorage.getItem('loggedInUser') && <NavLink to={'/gallery'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Gallery | {localStorage.getItem('loggedInUser')} </NavLink>}

                    <NavLink to={'/whats-new'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>What's New</NavLink>
                </div>
                {localStorage.getItem('loggedInUserEmail') ?
                    <div className="xl:flex gap-x-8 justify-center items-center hidden">
                        <span className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">{loggedInUser}</span>
                        <button onClick={handleLogout}> <PrimaryButton label='Log Out' /> </button>
                    </div>
                    :
                    <div className="xl:flex hidden gap-x-8 justify-center items-center">
                        <Link to={'/auth/login'} className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">Log in</Link>
                        <Link to={'/auth/signup'} className="w-fit h-fit p-0">
                            <PrimaryButton label="Start for free" />
                        </Link>
                    </div>
                }
            </div>)
    )
}

export default Sidebar
