import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './pages/ProductDetail';
import React from 'react';
import UserContext from './hooks/UserContext';
import Register from './pages/Register';
import CheckOutModal from './components/CheckOutModal';
import Authorization from './app/Authorization';
import ChatBot from './pages/ChatBot';
const App = () => {
    const [user, setUser] = React.useState({
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        phoneNumber: localStorage.getItem('phoneNumber'),
        userId: localStorage.getItem('userId'),
    });
    let modalExistRef = React.useRef(null);
    const setNewUser = (newUser) => {
        setUser(newUser);
    };
    return (
        <>
            <UserContext.Provider value={{ user, setNewUser }}>
                <div className="app min-h-screen bg-gray-50 text-lg text-gray-700">
                    <Navbar />
                    {/* This ToastContainer for toast notification */}
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chatbot" element={<ChatBot />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/register"
                            element={<Register modalExistRef={modalExistRef} />}
                        />

                        <Route
                            path="/products/:id"
                            element={<ProductDetail />}
                        />
                        <Route path="/cart" element={<Cart modalExistRef={modalExistRef}/>} />
                        <Route
                            path="/order"
                            element={
                                <Authorization>
                                    <Order />
                                </Authorization>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <CheckOutModal modalExistRef={modalExistRef}/>
                </div>
                <Footer />
            </UserContext.Provider>
        </>
    );
};

export default App;
