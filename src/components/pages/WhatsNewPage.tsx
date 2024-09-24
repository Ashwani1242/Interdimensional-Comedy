import { ReactTyped } from 'react-typed'
import Navbar from '../Navbar'
import InteractiveDisplay from '../background/IntercativeDisplay'
import Footer from '../Footer'
import CardCarousel from '../utils/CardCarousel'
import { webData } from '../../data/db'

function WhatsNewPage() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col  w-full p-32'>
                <ReactTyped
                    strings={[`Hey What's Up`, `Let's Checkout Some new things.`, `What's new on Interdimensional Comedy!`]}
                    typeSpeed={50}
                    loop
                    backSpeed={20}
                    cursorChar="|"
                    showCursor={true}
                    backDelay={2000}
                    className="text-9xl h-[500px]"
                />
            </div>
            <div className='w-[1200px] h-[400px] flex justify-center items-center relative overflow-hidden rounded-xl ring-1 ring-white/10 mb-32'>
                <InteractiveDisplay />
                <ReactTyped
                    strings={[`New Version v1.2`, `Now more faster response.`, `Get more smarter results!`]}
                    typeSpeed={50}
                    loop
                    backSpeed={20}
                    cursorChar="|"
                    showCursor={true}
                    backDelay={2000}
                    className="text-2xl z-10"
                />
            </div>
            <CardCarousel
                width={360}
                title={'New Features'}
                slides={webData.newfeaturs}
            />
            <Footer />
        </>
    )
}
<Navbar />
export default WhatsNewPage