import { createContext, useContext, useReducer, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';
import axiosInstance from '../services/axiosInstance'; //  we'll use this to make the GET call
import { toast } from 'react-toastify';


const AuthContext = createContext();

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, isAuthenticated: true, error: null };
        case 'LOGIN_ERROR':
            return { ...state, loading: false, isAuthenticated: false, user: null, error: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null, loading: false, error: null };
        default:
            return state;
    }
};

// Auth Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        loading: true,
        error: null,
    });
    //  Auth check on first load
    useEffect(() => {
        const validate = async () => {
            try {
                const res = await axiosInstance.get('/auth/is-authenticated');
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
            } catch (err) {
                dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid token or server error' });
            }
        };

        validate();
    }, []);

    // Login
    const login = async ({ email, password }) => {
        toast.info('Logging in......');
        dispatch({ type: 'LOGIN_START' });
        try {

            // Step 1: Call login API (sets cookies)
            await loginService({ email, password });
            // Step 2: Call user-details API to fetch user info
            // Step 3: Update context
            dispatch({ type: 'LOGIN_SUCCESS' });
            toast.success('Logged in successfully!');
            console.log("login was successfull")
        } catch (err) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: err?.response?.data?.message || 'Login failed',
            });
            toast.error(err?.response?.data?.message || 'Login failed');

        }
    };




    // Logout
    const logout = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        await logoutService()
        dispatch({ type: 'LOGOUT' });
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
