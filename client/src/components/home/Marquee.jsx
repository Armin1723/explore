import React from 'react'
import MarqueeItem from './MarqueeItem'
import { upperMarquee } from '../../utils'

const Marquee = () => {
  return (
    <div
    id="clients"
    className="marquee flex flex-col py-6 items-center md:text-3xl bg-gray-400 text-black max-lg:text-xs rounded-t-lg overflow-hidden whitespace-nowrap "
  >
    <MarqueeItem images={upperMarquee} from={0} to={"-100%"} />
  </div>
  )
}

export default Marquee
