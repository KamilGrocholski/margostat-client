import { TrendingUpIcon, TrendingDownIcon } from '../assets/svg/TrendingIcons'

const Trending = ({ value, iconSize }: { value: number, iconSize: number }) => {
    if (value > 0) return <span className='text-green-500'><TrendingUpIcon size={ iconSize } /></span>
    if (value < 0) return <span className='text-red-500'><TrendingDownIcon size={ iconSize } /></span>
    return <div></div>
}

export default Trending