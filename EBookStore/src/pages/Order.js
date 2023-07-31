import React from 'react';
import { Tab, initTE } from 'tw-elements';
import OrderTable from '../components/OrderTable';
import axios from 'axios';
export default function Order() {
    initTE({ Tab });
    const [orders, setOrders] = React.useState([]);

    const [selectedStatus, setSelectedStatus] = React.useState(0);

    const filterOrdersByStatus = (status) => {
        setSelectedStatus(status);
    };
    // Filter the orders based on the selected status
    const filteredOrders = selectedStatus != null
        ? orders.filter((order) => order.orderStatus === selectedStatus)
        : orders;
   
    React.useEffect(() => {
        const userId = localStorage.getItem('userId')
        const apiEndpoint = `https://localhost:5001/api/Orders/customer-order?userId=${userId}`;
        axios
            .get(apiEndpoint)
            .then((response) => {
                setOrders(response.data.resultObj);
            })
            .catch((error) => {
                // Handle errors if the API call fails (e.g., show an error message)
                console.error('Error submitting form:', error);
            });
    }, []);
    return (
        <div style={{ textAlign: 'center' }}>
            <ul
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0 justify-around"
                role="tablist"
                data-te-nav-ref
            >
                <li role="presentation">
                    <a
                        href="#tabs-0"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-target="#tabs-0"
                        data-te-nav-active
                        role="tab"
                        aria-controls="tabs-0"
                        aria-selected="true"
                        onClick={()=>{filterOrdersByStatus(0)}}                     
                    >
                        InProgress
                    </a>
                </li>
                <li role="presentation">
                    <a
                        href="#tabs-1"
                        className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-target="#tabs-1"
                        role="tab"
                        aria-controls="tabs-1"
                        aria-selected="false"
                        onClick={()=>{filterOrdersByStatus(1)}}
                    >
                        Confirmed
                    </a>
                </li>
                <li role="presentation">
                    <a
                        href="#tabs-2"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-target="#tabs-2"
                        role="tab"
                        aria-controls="tabs-2"
                        aria-selected="false"
                        onClick={()=>{filterOrdersByStatus(2)}}

                    >
                        Shipping
                    </a>
                </li>
               
                <li role="presentation">
                    <a
                        href="#tabs-3"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-target="#tabs-3"
                        role="tab"
                        aria-controls="tabs-3"
                        aria-selected="false"
                        onClick={()=>{filterOrdersByStatus(3)}}

                    >
                        Success
                    </a>
                </li>
                <li role="presentation">
                    <a
                        href="#tabs-4"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-target="#tabs-4"
                        role="tab"
                        aria-controls="tabs-4"
                        aria-selected="false"
                        onClick={()=>{filterOrdersByStatus(4)}}

                    >
                        Canceled
                    </a>
                </li>
            </ul>
            <div className="mb-6">
                {[0, 1, 2, 3, 4].map((index)=>{
                    return (<OrderTable key={index} index={index} data={filteredOrders}></OrderTable>)
                })}
                
               
            </div>
        </div>
    );
}
