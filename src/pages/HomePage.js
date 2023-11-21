import React from 'react';

const HomePage = () => {
    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="">GPTHub</span>
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        {/* Placeholder for the actual functionality */}
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <a href="/list" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                        <a href="/account" className="text-sm font-semibold leading-6 text-gray-900">Account</a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in →</a>
                    </div>
                </nav>

                {/* Mobile menu, shown/hidden based on state */}
                <div className="lg:hidden">
                    {/* Placeholder for actual mobile menu items */}
                </div>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* Background shapes */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Explore the forefront of AI innovation. <a href="#" className="font-semibold text-indigo-600">Discover More →</a>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Premium GPT Chatbot and AI Startups
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    Dive into the world of advanced AI solutions. Find, compare, and connect with top-tier GPT chatbot and AI startups poised to transform industries.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Join GPTHub Today</a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Explore AI Startups →</a>
                    </div>

                </div>

                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Accelerate Your Launch</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Comprehensive Tools for Efficient App Deployment</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Explore streamlined processes and integrated solutions designed for optimal efficiency. Our platform ensures a seamless transition from development to deployment, enhancing productivity and reducing time to market.</p>
                    </div>

                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {/* Feature Item 1 */}
                            <div className="relative pl-16">
                                {/* Icon */}
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    {/* Replace this SVG with your icon */}
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* SVG path */}
                                    </svg>
                                </div>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    Tailored AI Solutions
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Curated selections of AI startups specializing in bespoke solutions for diverse business needs.
                                </dd>

                            </div>

                            {/* Feature Item 2 */}
                            <div className="relative pl-16">
                                {/* Icon */}
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    {/* Replace this SVG with your icon */}
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* SVG path */}
                                    </svg>
                                </div>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    Innovative Chatbot Platforms
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Explore cutting-edge chatbot technologies that redefine customer engagement and support.
                                </dd>

                            </div>

                            {/* Feature Item 3 */}
                            <div className="relative pl-16">
                                {/* Icon */}
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    {/* Replace this SVG with your icon */}
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* SVG path */}
                                    </svg>
                                </div>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    Robust Networking Opportunities
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Connect with industry leaders and peers to expand your AI and chatbot knowledge and network.
                                </dd>

                            </div>

                            {/* Feature Item 4 */}
                            <div className="relative pl-16">
                                {/* Icon */}
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    {/* Replace this SVG with your icon */}
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {/* SVG path */}
                                    </svg>
                                </div>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    Industry Insights and Trends
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Stay ahead with the latest trends, market insights, and thought leadership in the AI and chatbot domain.
                                </dd>

                            </div>
                        </dl>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                         style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
