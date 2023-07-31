import { Link } from 'react-router-dom';

const Slide = ({ book }) => {
    return (
        <div
            className="slide flex justify-around items-center	 "
            style={{ background: `#e6e3dc`, padding: '0 50px' }}
            key={book.id}
        >
            <div className="slide-content container mx-auto h-full flex flex-col gap-5 justify-center items-start ">
                <h1 className="text-[7vw] uppercase w-4/5 font-bold space-font leading-none">
                    {book.description}
                </h1>
                <p className="sm:w-3/5 text-sm sm:text-lg w-full">
                    {book.seotitle}
                </p>
                <Link
                    to={`products/${book.id}`}
                    style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                    className="slide-cta-btn border border-violet-50 w-60 h-10 font-light text-sm sm:text-lg sm:w-72 sm:h-14 sm:font-medium mt-5 hover:text-orange-50 duration-300 relative"
                >
                    <span
                        style={{ margin: '10px' }}
                        className="w-full xs:h-full text-center absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[2]"
                    >
                        {book.name}
                    </span>
                </Link>
            </div>
            <img
                style={{ height: '800px', width: '600px', flex: '1' }}
                src={'data:image/jpeg;base64,' + book.thumbnailImage}
                alt={book.name}
            />
        </div>
    );
};

export default Slide;
