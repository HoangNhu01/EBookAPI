import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import UserContext from '../hooks/UserContext';
import Cookies from 'js-cookie';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import { BsFillPersonFill } from 'react-icons/bs';
const Navbar = () => {
    //Accessing state from cart slice
    const { cartItems } = useSelector((state) => state.cart);
    const { user, setNewUser } = React.useContext(UserContext);
    const logOut = () => {
        setNewUser({
            name: null,
            email: null,
        });
        Cookies.remove('jwtCookie');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    };
    const token = Cookies.get('jwtCookie');

    //Menu active style
    const isNavActiveStyles = ({ isActive }) => {
        return {
            color: isActive ? '#d4d4d4' : null,
        };
    };

    return (
        <div className="navbar-bg bg-violet-500 text-violet-50 h-28 sm:h-20 flex justify-center items-center p-10 sm:p-0">
            <div className="navbar container mx-auto flex items-center justify-between flex-col gap-3 sm:gap-0 sm:flex-row">
                <div className="left">
                    <Link to="/" className="group flex">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        <span
                            id="nav-1"
                            className="logo text-xl font-semibold group-hover:text-orange-500 duration-300"
                        >
                            EBook
                            <span className="text-orange-500 group-hover:text-violet-50 duration-300">
                                Store
                            </span>
                        </span>
                    </Link>
                </div>
                <div className="right flex items-center gap-5">
                    <Tippy
                        trigger="click"
                        placement={'bottom'}
                        animation="perspective"
                        interactive={true}
                        theme="light"
                        content={
                            <div>
                                {user.name == null ? (
                                    <div>
                                        <div>
                                            <Link
                                                style={{
                                                    borderRadius: '5px',
                                                    height: '32px',
                                                    padding: '5px',
                                                }}
                                                to={'/register'}
                                            >
                                                Đăng Nhập
                                            </Link>
                                        </div>
                                        
                                    </div>
                                ) : (
                                    <Link
                                        style={{
                                            borderRadius: '5px',
                                            height: '32px',
                                        }}
                                        onClick={logOut}
                                    >
                                        Đăng xuất
                                    </Link>
                                )}
                            </div>
                        }
                    >
                        <span
                            style={{
                                cursor: 'pointer',
                            }}
                            className="user-account for-buy"
                        >
                            <i className="icon icon-user" />

                            <span className="flex items-center place-content-between	">
                                <BsFillPersonFill />
                                {user.name == null ? 'Account' : user.name}
                            </span>
                        </span>
                    </Tippy>

                    <NavLink
                        end
                        to="/"
                        className="nav-link"
                        style={isNavActiveStyles}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className="nav-link"
                        style={isNavActiveStyles}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/chatbot"
                        className="nav-link"
                        style={isNavActiveStyles}
                    >
                        ChatBot
                    </NavLink>
                    {token && (
                        <NavLink
                            end
                            to="/order"
                            className="nav-link"
                            style={isNavActiveStyles}
                        >
                            Order
                        </NavLink>
                    )}
                    <Link to="/cart">
                        <span className="cart-icon relative">
                            <BsCart3 />
                            <span className="cart-counter absolute -top-3 -right-3 text-xs bg-orange-600 font-medium rounded-full w-5 h-5 flex justify-center items-center z-[1]">
                                {cartItems.length}
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
