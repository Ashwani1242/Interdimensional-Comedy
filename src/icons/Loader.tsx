interface props {
    isLoading?: boolean
}

function Loader({isLoading = true}: props) {
    return (
        <div className="flex-col gap-4 flex items-center justify-center">
            {isLoading ? <div className="w-6 h-6 border-2 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-4 h-4 border-2 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
            </div> : <div className="w-6 h-6 text-[18px] flex justify-center items-center border-2 border-green-500 rounded-full text-green-500 p-1">✔</div> }
        </div>

    )
}

export default Loader
