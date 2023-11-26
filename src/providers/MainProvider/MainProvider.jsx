import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import axios from "axios";
import { clearCookie } from "../../api/auth";

export const MainContext = createContext();
const MainProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();

    const server = "http://localhost:5000";

    const categories = [
        { label: "All", value: "" },
        { label: "Business Contest", value: "business" },
        { label: "Medical Contest", value: "medical" },
        { label: "Article Writing", value: "article" },
        { label: "Gaming Contest", value: "gaming" },
    ];

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = async () => {
        setLoading(true);
        await clearCookie();
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("CurrentUser-->", currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const imageUpload = async (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBbApiKey}`,
            formData
        );

        return data;
    };

    const values = {
        server,
        categories,
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
        imageUpload,
    };

    return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

MainProvider.propTypes = {
    children: PropTypes.node,
};
export default MainProvider;
