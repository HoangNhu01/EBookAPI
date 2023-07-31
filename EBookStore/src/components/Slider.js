import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Slide from './Slide';

const Slider = () => {
    const { items: books } = useSelector((state) => state.products);
    let data = books.resultObj?.items.filter((item) => {
        return item.isFeature;
    });

    // Manual Sliding functionality
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? data.length - 1 : (prevSlide) => prevSlide - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === data.length - 1 ? 0 : (prevSlide) => prevSlide + 1
        );
    };

    return (
        <div className="frame relative">
            <div
                className="slider"
                style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
            >
                {/* Take taka from data arrey */}
                {data.map((book) => (
                    <Slide key={book.id} book={book} />
                ))}
            </div>
            <div className="slider-buttons absolute z-[1] xs:text-lg text-2xl left-0 right-0 bottom-10 flex gap-10 m-auto w-fit">
                <button
                    style={{ borderRadius: '5px' }}
                    onClick={prevSlide}
                    className="prev-btn w-10 h-10 lg:w-20 lg:h-14 bg-violet-900 text-violet-200  border-violet-200 flex justify-center items-center hover:bg-gray-900 hover:text-gray-200 hover:border-gray-200 duration-300"
                >
                    <span>
                        <BsArrowLeft />
                    </span>
                </button>
                <button
                    style={{ borderRadius: '5px' }}
                    onClick={nextSlide}
                    className="next-btn w-10 h-10 lg:w-20 lg:h-14 bg-violet-900 text-violet-200 border-violet-200 flex justify-center items-center hover:bg-gray-900 hover:text-gray-200 hover:border-gray-200 duration-300"
                >
                    <span>
                        <BsArrowRight />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Slider;
