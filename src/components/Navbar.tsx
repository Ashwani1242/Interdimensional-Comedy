import { Link, NavLink, useNavigate } from "react-router-dom"
import MainIcon from "../icons/MainIcon"
import PrimaryButton from "./utils/PrimaryButton"
import { useEffect, useState } from "react"

interface props {
    color?: string
}

function Navbar({ color = "transparent" }: props) {

    const [loggedInUser, setLoggedInUser] = useState('')
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


    return (
        <nav
            style={{ backgroundColor: color }}
            className="flex justify-between z-50 text-sm text-nowrap items-center px-32 py-4 fixed top-0 w-full max-w-[1920px]">
            <Link to={'/'} className="flex justify-center items-center gap-x-4 cursor-none">
                <MainIcon />
                <div className='text-xl uppercas font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent'>
                    Interdimensional Comedy
                </div>
            </Link>
            <div className="flex gap-x-8 justify-center items-center">
                <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Home</NavLink>
                <NavLink to={'/comedy-show'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Comedy Show</NavLink>
                <NavLink to={'/kids-music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Kid's Music</NavLink>
                <NavLink to={'/pricing'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Pricing</NavLink>
                {localStorage.getItem('loggedInUser') && <NavLink to={'/gallery'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Gallery | {localStorage.getItem('loggedInUser')} </NavLink>}
                <NavLink to={'/whats-new'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-none hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>What's New</NavLink>
            </div>
            {localStorage.getItem('loggedInUserEmail') ?
                <div className="flex gap-x-8 justify-center items-center">
                    <span className="cursor-none text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">{loggedInUser}</span>
                    <button onClick={handleLogout}> <PrimaryButton label='Log Out' /> </button>
                </div>
                :
                <div className="flex gap-x-8 justify-center items-center">
                    <Link to={'/auth/login'} className="cursor-none text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">Log in</Link>
                    {/* <div className="bg-indigo-500 cursor-pointer px-4 py-1 rounded-sm border-2 border-transparent hover:border-white transition-all duration-500">Start for free</div> */}
                    <Link to={'/auth/signup'} className="w-fit h-fit p-0">
                        <PrimaryButton label="Start for free" />
                    </Link>
                </div>
            }
        </nav>
    )
}

export default Navbar
