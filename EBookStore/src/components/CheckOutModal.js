import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currencyFormatter } from '../utilities/currencyFormatter';
import UserContext from '../hooks/UserContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart } from '../features/products/cartSlice';
import { initialModal } from '../utilities/modalToggle';

export default function CheckOutModal({ modalExistRef }) {
    const { cartItems: data, cartTotalAmount: totalPrice } = useSelector(
        (state) => state.cart
    );

    const dispatch = useDispatch();
    const { user } = React.useContext(UserContext);
    let cartItems = [];

    const [formData, setFormData] = React.useState({
        orderId: null,
        userId: user.userId,
        userName: user.name,
        phoneNumber: user.phoneNumber,
        address: '',
        email: user.email,
        paymentStatus: 0,
        totalPrice: totalPrice,
        orderDate: new Date(),
        cartItems,
    });
    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cartItems = data.map((item) => {
            return {
                productId: item.id,
                quantity: item.cartQuantity,
                description: item.description,
                name: item.name,
                image: item.thumbnailImage,
                price: item.price,
            };
        });
        setFormData({
            ...formData,
            orderId: uuidv4(),
            cartItems: cartItems,
            totalPrice: totalPrice,
        });
    }, [totalPrice]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiEndpoint = 'https://localhost:5001/api/Orders/checkouts';

        // Make the API call using Axios
        axios
            .post(apiEndpoint, formData)
            .then((response) => {
                dispatch(clearCart());
                toast.success('Order Success!');
                initialModal(modalExistRef.current);
            })
            .catch((error) => {
                // Handle errors if the API call fails (e.g., show an error message)
                console.error('Error submitting form:', error);
            });
    };
    return (
        <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="rightTopModal"
            tabIndex={-1}
            aria-labelledby="rightTopModalLabel"
            aria-hidden="true"
        >
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none absolute right-7 h-auto w-full translate-x-[100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[1440px]"
            >
                <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        {/*Modal title*/}
                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel"
                        >
                            Checkout Order
                        </h5>
                        {/*Close button*/}
                        <button
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-modal-dismiss
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {/*Modal body*/}
                    <div
                        className="relative flex-auto p-4"
                        data-te-modal-body-ref
                    >
                        <div>
                            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                                <div className="text-2xl font-bold text-gray-800">
                                    EBookStore
                                </div>
                                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                                    <div className="relative">
                                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                                <Link
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                                    to="#"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </Link>
                                                <span className="font-semibold text-gray-900">
                                                    Shop
                                                </span>
                                            </li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                                <Link
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                                    href="#"
                                                >
                                                    2
                                                </Link>
                                                <span className="font-semibold text-gray-900">
                                                    Shipping
                                                </span>
                                            </li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                                <Link
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                                    href="#"
                                                >
                                                    3
                                                </Link>
                                                <span className="font-semibold text-gray-500">
                                                    Payment
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                                    <div className="px-4 pt-8">
                                        <p className="text-xl font-medium">
                                            Order Summary
                                        </p>
                                        <p className="text-gray-400">
                                            Check your items. And select a
                                            suitable shipping method.
                                        </p>
                                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                            {formData.cartItems.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col rounded-lg bg-white sm:flex-row"
                                                    >
                                                        <img
                                                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                                            src={
                                                                'data:image/jpeg;base64,' +
                                                                item.image
                                                            }
                                                            alt=""
                                                        />
                                                        <div className="flex w-full flex-col px-4 py-4">
                                                            <span className="font-semibold">
                                                                {item.name}
                                                            </span>
                                                            <span className="float-right text-gray-400">
                                                                {item.quantity}
                                                            </span>
                                                            <p className="text-lg font-bold">
                                                                {currencyFormatter(
                                                                    item.price
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="mt-8 text-lg font-medium">
                                            Shipping Methods
                                        </p>
                                        <div className="mt-5 grid gap-6">
                                            <div className="relative">
                                                <input
                                                    className="peer hidden"
                                                    id="radio_1"
                                                    type="radio"
                                                    name="paymentStatus"
                                                    value={0}
                                                    onClick={handleChange}
                                                />
                                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                                                <label
                                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                                    htmlFor="radio_1"
                                                >
                                                    <img
                                                        className="w-14 object-contain"
                                                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                                                        alt=""
                                                    />
                                                    <div className="ml-5">
                                                        <span className="mt-2 font-semibold">
                                                            Payment on delivery
                                                        </span>
                                                        <p className="text-slate-500 text-sm leading-6">
                                                            Delivery: 2-4 Days
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    className="peer hidden"
                                                    id="radio_2"
                                                    type="radio"
                                                    name="paymentStatus"
                                                    value={1}
                                                    onClick={handleChange}
                                                />
                                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                                                <label
                                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                                    htmlFor="radio_2"
                                                >
                                                    <img
                                                        className="w-14 object-contain"
                                                        src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                                                        alt=""
                                                    />
                                                    <div className="ml-5">
                                                        <span className="mt-2 font-semibold">
                                                            Payment via e-wallet
                                                        </span>
                                                        <p className="text-slate-500 text-sm leading-6">
                                                            Delivery: 2-4 Days
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                        <p className="text-xl font-medium">
                                            Payment Details
                                        </p>
                                        <p className="text-gray-400">
                                            Complete your order by providing
                                            your payment details.
                                        </p>
                                        <div className>
                                            <label
                                                htmlFor="email"
                                                className="mt-4 mb-2 block text-sm font-medium"
                                            >
                                                Email
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="your.email@gmail.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                htmlFor="card-holder"
                                                className="mt-4 mb-2 block text-sm font-medium"
                                            >
                                                Ship Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="card-holder"
                                                    name="userName"
                                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Your full name here"
                                                    value={formData.userName}
                                                    onChange={handleChange}
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                htmlFor="card-holder"
                                                className="mt-4 mb-2 block text-sm font-medium"
                                            >
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="card-holder-1"
                                                    name="phoneNumber"
                                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Your phone number here"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <svg
                                                        className="h-4 w-4 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <label
                                                htmlFor="billing-address"
                                                className="mt-4 mb-2 block text-sm font-medium"
                                            >
                                                Billing Address
                                            </label>
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="relative flex-shrink-0 sm:w-7/12">
                                                    <input
                                                        type="text"
                                                        id="billing-address"
                                                        name="address"
                                                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="Street Address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                        <img
                                                            className="h-4 w-4 object-contain"
                                                            src="https://flagpack.xyz/_nuxt/82862d96f28cd0c385b2afb862be8393.svg"
                                                            alt="flagpack-VN"
                                                        />
                                                    </div>
                                                </div>
                                                <select
                                                    type="text"
                                                    name="billing-state"
                                                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="State">
                                                        State
                                                    </option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name="billing-zip"
                                                    className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="ZIP"
                                                />
                                            </div>
                                            {/* Total */}
                                            <div className="mt-6 border-t border-b py-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Subtotal
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        {currencyFormatter(
                                                            formData.totalPrice
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Shipping
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        $8.00
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Total
                                                </p>
                                                <p className="text-2xl font-semibold text-gray-900">
                                                    {currencyFormatter(
                                                        formData.totalPrice
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/*Modal footer*/}
                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button
                            type="button"
                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Close
                        </button>
                        {/* <button
                            type="button"
                            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Save changes
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
