import React from 'react';
import { currencyFormatter } from '../utilities/currencyFormatter';
export default function OrderTable({ index, data }) {
    return (
        <div
            className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id={'tabs-' + index}
            role="tabpanel"
            aria-labelledby={'tabs-' + index + '-tab'}
            {...(index !== 1 ? {} : { 'data-te-tab-active': '' })}
        >
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light text-center	">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            Order Id
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Order Date
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Total Price
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Book Name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((element) => {
                                            return (
                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                        {element.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {element.orderDate}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {currencyFormatter(element.totalPrice)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {element.orderDetails.reduce((productName, orderDetail, index) => {
                                                        if (index === 0) {
                                                            return orderDetail.productName;
                                                        } else {
                                                            return productName + ', ' + orderDetail.productName;
                                                        }
                                                        }, '')}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
