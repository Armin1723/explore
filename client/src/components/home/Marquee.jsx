import React from 'react'
import MarqueeItem from './MarqueeItem'
import { lowerMarquee, upperMarquee } from '../../utils'

const Marquee = () => {
  return (
    <div
    id="clients"
    className="marque flex flex-col py-6 items-center md:text-3xl max-lg:text-xs rounded-t-lg bg-gray-900 shadow-[0_0_20px_gray] shadow-gray-300/40 overflow-hidden whitespace-nowrap "
  >
    <MarqueeItem images={upperMarquee} from={0} to={"-100%"} />
    <MarqueeItem images={lowerMarquee} from={"-100%"} to={0} />
  </div>
  )
}

export default Marquee
