interface props {
    size?: string,
    color?: string,
    title?: string,
    customClass?: string,
}

function Arrow({ size = '50px', color = '#FFFFFF', customClass = '', title = '' }: props) {
    return (
        <div className={`${customClass} cursor-none w-fit h-fit duration-200 hover:scale-125 active:scale-100" title="Go Back flex items-center gap-x-4 text-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} stroke={color} viewBox="0 0 24 24">
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
            </svg>
            {title}
        </div>
    )
}

export default Arrow
