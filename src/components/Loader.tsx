interface ILoaderProps {
    size?: string
}

const Loader = ({ size = 'auto' }: ILoaderProps) => {
    return (
        <div className={ `flex items-center justify-center ${ size === 'auto' ? 'w-full h-full' : `h-${ size } w-${ size }` }` }>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
