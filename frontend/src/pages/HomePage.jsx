function HomePage() {
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="container bg-lime-400 p-20">
                    <form>
                        <h1 className="text-center font-bold text-white text-4xl">
                            Welcome to Cook&Friends!
                        </h1>
                        <p className="mx-auto font-normal text-white text-center text-sm my-6 max-w-lg">
                            Find your friends and share your recipes with them!
                        </p>
                        <div className="sm:flex items-center bg-white rounded-lg overflow-hidden mx-8 px-2 py-1 justify-between">
                            <input
                                className="text-base text-gray-400 flex-grow outline-none px-2 "
                                type="text"
                                placeholder="Search for users"
                            />
                            <button className="bg-lime-600 text-white text-base rounded-lg px-4 py-2 font-thin">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mx-8">
                <p className="text-2xl text-lime-600 font-bold mt-8">
                    Most followed users
                </p>
            </div>
            <div className="mx-8">
                <p className="text-2xl text-lime-600 font-bold mt-8">
                    Most popular recipes
                </p>
            </div>
        </>
    );
}

export default HomePage;
