import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';
export default function Authorization({ children }) {
    const token = Cookies.get('jwtCookie');
    const location = useLocation();
    // eslint-disable-next-line no-lone-blocks
    if (!token) {
        return (
            <Navigate to={'/register'} state={{ path: location.pathname }} />
        );
    }
    return children;
}
