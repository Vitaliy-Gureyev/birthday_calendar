import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import {auth, db, provider} from "../../../firebase";
import {signInWithEmailAndPassword, signOut, signInWithPopup} from "firebase/auth";
import {addDoc, collection, doc, setDoc } from "firebase/firestore/lite";

export const AuthActionCreator = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),

    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),

    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionsEnum.SET_IS_LOADING,
        payload: isLoading
    }),

    setError: (error: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),

    loginWithEmail: (username: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreator.setIsLoading(true))
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const name = user.displayName === null ? '' : user.displayName
                const email = user.email === null ? '' : user.email
                dispatch(AuthActionCreator.setIsAuth(true))
                dispatch(AuthActionCreator.setUser({username: name, id: user.uid, email: email}))
            })
            .catch((error) => {
                const errorCode = error.code;
                dispatch(AuthActionCreator.setError(errorCode))
            });
        dispatch(AuthActionCreator.setIsLoading(false))
    },

    loginWithGoogle: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreator.setIsLoading(true))
        await signInWithPopup(auth, provider)
            .then(userCredential => {
                const user = userCredential.user;
                const name = user.displayName === null ? '' : user.displayName
                const email = user.email === null ? '' : user.email
                dispatch(AuthActionCreator.setIsAuth(true))
                dispatch(AuthActionCreator.setUser({
                    username: name,
                    id: user.uid,
                    email: email,
                }))

            })
            .then(() => {
                localStorage.setItem('auth', 'true')
                dispatch(AuthActionCreator.setIsLoading(false))
            })
            .catch((error) => {
                const errorCode = error.code;
                dispatch(AuthActionCreator.setError(errorCode))
            });
    },

    logout: () => async (dispatch: AppDispatch) => {
        signOut(auth).then(() => {
            dispatch(AuthActionCreator.setUser({} as IUser))
            dispatch(AuthActionCreator.setIsAuth(false))
            localStorage.removeItem('auth')
        }).catch((error) => {
            alert(error)
        });
    },
}