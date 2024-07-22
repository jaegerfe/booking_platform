import bannerLandscape from '@/assets/banner-landscape.jpeg'

export function Banner() {
    return (
        <section className="items-center grid">
            <div className='col-start-1 row-start-1 flex flex-nowrap'>
                <img className='h-96 w-full object-cover object-bottom rounded-xl' src={bannerLandscape}></img>
            </div>
            <div className='z-10 col-start-1 row-start-1 w-full h-96 bg-home-banner-filter rounded-xl'>
                <div className='px-8 max-w-xl mt-20'>
                    <h1 className='font-bold text-5xl text-header-color'>Find your next vacation stay here!</h1>
                </div>
            </div>
        </section>
    )
}
