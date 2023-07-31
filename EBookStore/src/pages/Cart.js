import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { currencyFormatter } from '../utilities/currencyFormatter';
import {
    addToCart,
    clearCart,
    decreaseCart,
    getSubtotal,
    removeFromCart,
} from '../features/products/cartSlice';
import { toast } from 'react-toastify';
// import { take } from 'rxjs/operators';
import React from 'react';
// import behaviorSubject from '../hooks/BehaviorSubject';
import Cookies from 'js-cookie';
import { myModal, initialModal } from '../utilities/modalToggle';

const Cart = ({modalExistRef}) => {
    //Accessing state from cart slice
    const { cartItems: data, cartTotalAmount: subtotal } = useSelector(
        (state) => state.cart
    );
    const token = Cookies.get('jwtCookie');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    //Remove cart from cart
    const removeCartHandler = (product) => {
        dispatch(removeFromCart(product));
    };

    //Increase cart item
    const handleIncrease = (product) => {
        dispatch(addToCart(product));
    };

    //Decrease cart item
    const handleDecrease = (product) => {
        dispatch(decreaseCart(product));
    };
    // const initialModal = () => {
    //     const myModal = new Modal(document.getElementById('rightTopModal'));
    //     myModal.toggle();
    // };
    React.useEffect(()=>{
        console.log(myModal());
    })
    const HandleCheckOut = (e) => {
        e.preventDefault();
        if (token == null) {
            const data = { key: 'rightTopModal' };
            navigate(
                '/register',
                { state: data } // The data will be accessible in the component via props.location.state
            );
            toast.warning('Đăng Nhập để checkout');
        } else {
            modalExistRef.current = myModal();
            initialModal(modalExistRef.current);
        }
    };

    //Real time subtotal
    useEffect(() => {
        dispatch(getSubtotal());
    }, [data, dispatch]);

    // useEffect(() => {
    //     behaviorSubject.pipe(take(2)).subscribe((res) => {
    //         let result = res != null ? initialModal() : null;

    //     });
    // }, []);
    return (
        <div className="cart-section container mx-auto py-10">
            {/* This header will indicate if the cart is empty or contains one or more products */}
            <h2 className="section-title text-2xl font-bold space-font text-center uppercase mb-10">
                {data.length > 0
                    ? `You've added ${data.length} item${
                          data.length > 1 ? 's' : ''
                      }`
                    : 'Your cart is empty'}
            </h2>

            {/* If cart is empty */}
            <div className="text-center">
                {data.length === 0 && (
                    <Link
                        to="/products"
                        className="text-sky-500 font-medium text-lg gap-2 flex justify-center items-center group"
                    >
                        <span className="group-hover:-translate-x-2 group-hover:text-orange-500 duration-300">
                            <BsArrowLeft />
                        </span>
                        <span className="group-hover:text-orange-500">
                            Start shopping
                        </span>
                    </Link>
                )}
            </div>

            {/* //If product exist */}
            {data.length > 0 && (
                <>
                    <div className="cart-container px-5 md:px-0">
                        <div className="product-headlines md:grid grid-cols-5 font-medium uppercase gap-10 border-b pb-3 hidden">
                            <div className="col-product col-span-2">
                                Product
                            </div>
                            <div className="col-unit-price">Unit Price</div>
                            <div className="col-quantity">Quantity</div>
                            <div className="col-total-price ml-auto">
                                Total Price
                            </div>
                        </div>
                        <div className="products flex flex-col">
                            {/* This data come from API in cart slice */}
                            {data.map((product) => (
                                <div
                                    key={product.id}
                                    className="product grid md:grid-cols-5 grid-cols-2 gap-10 mt-10 border-b pb-5 items-center"
                                >
                                    <div className="left-sec col-span-3 md:col-span-2 flex gap-5">
                                        <img
                                            src={
                                                'data:image/jpeg;base64,' +
                                                product.thumbnailImage
                                            }
                                            alt={product.name}
                                            className="md:w-32 md:h-32 object-cover w-24 h-24"
                                        />
                                        <div className="product-detail flex flex-col items-start gap-3">
                                            <span className="text-medium md:text-lg">
                                                {product.name}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    removeCartHandler(product)
                                                }
                                                className="text-gray-400 uppercase text-sm md:text-lg hover:text-rose-500 duration-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="unit-price hidden md:block">
                                        <span>
                                            {currencyFormatter(product.price)}
                                        </span>
                                    </div>
                                    <div className="counter flex">
                                        <button
                                            onClick={() =>
                                                handleDecrease(product)
                                            }
                                            className="bg-gray-100 w-8 md:w-10 h-8 md:h-10 border border-gray-300 active:bg-gray-700 active:text-gray-50 text-sm md:text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-100 w-8 md:w-10 h-8 md:h-10 border border-gray-300 flex justify-center items-center text-sm md:text-lg">
                                            {product.cartQuantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleIncrease(product)
                                            }
                                            className="bg-gray-100 w-8 md:w-10 h-8 md:h-10 border border-gray-300 active:bg-gray-700 active:text-gray-50 text-sm md:text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="total-price font-medium ml-auto">
                                        <span>
                                            {/* //This fucntion for formate price in USD currency */}
                                            {currencyFormatter(
                                                product.price *
                                                    product.cartQuantity
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart-lower-sec flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between md:items-start md:gap-0 py-10 px-5 md:px-0">
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="clear-btn py-3 px-8 text-sm md:text-lg border uppercase font-medium bg-rose-200 text-rose-600 border-rose-500 hover:bg-rose-500 hover:text-rose-50 duration-300"
                        >
                            Clear cart
                        </button>
                        <div className="flex flex-col items-start gap-2">
                            <div className="subtotal flex justify-between w-full font-medium md:text-2xl text-xl">
                                <span className="text-sky-500">Subtotal</span>
                                <span className="text-rose-500">
                                    {/* //This fucntion for formate price in USD currency */}
                                    {currencyFormatter(subtotal)}
                                </span>
                            </div>
                            <p className="tax-note text-gray-400 text-sm md:text-lg text-justify">
                                Taxes and shipping costs are calculated at the
                                checkout
                            </p>
                            <button
                                type="button"
                                className="inline-block text-sm md:text-lg bg-sky-500 text-sky-50 w-full text-center py-3 uppercase font-medium tracking-widest hover:bg-sky-600 duration-300 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-toggle="modal"
                                // data-te-target="#rightTopModal"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={HandleCheckOut}
                            >
                                Check Out
                            </button>
                            <div className="continue-shopping">
                                <Link
                                    to="/products"
                                    className="text-sky-500 font-medium text-lg gap-2 flex items-center group"
                                >
                                    <span className="group-hover:-translate-x-2 group-hover:text-orange-500 duration-300">
                                        <BsArrowLeft />
                                    </span>
                                    <span className="group-hover:text-orange-500">
                                        Continue shopping
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
