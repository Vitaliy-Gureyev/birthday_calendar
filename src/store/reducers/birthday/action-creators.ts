import {IBirthday} from "../../../models/IBirthday";
import {BirthdayActionEnum, setBirthdayAction} from "./types";
import {AppDispatch} from "../../index";
import {db} from "../../../firebase";
import {addDoc, collection, doc, setDoc } from "firebase/firestore/lite";


export const birthdayActionCreators = {
    setBirthdays: (payload: IBirthday[]): setBirthdayAction => ({type: BirthdayActionEnum.SET_BIRTHDAYS, payload}),

    createBirthday: (birthday: IBirthday) => async (dispatch: AppDispatch) => {

        try {
            const docRef = await addDoc(collection(db, birthday.authorId, 'birthdays'), {
                name: birthday.birthdayPersonName,
                date: birthday.date,
                description: birthday.description,
                author: birthday.authorId
            });
            console.log(birthday)
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        /* try {
             const birthdays = localStorage.getItem('birthdays') || '[]'
             const json = JSON.parse(birthdays) as IBirthday[]
             json.push(birthday)
             dispatch(birthdayActionCreators.setBirthdays(json))
             localStorage.setItem('birthdays', JSON.stringify(json))
         } catch (e) {
             console.log(e)
         }*/

    },

    fetchBirthday: (username:string) => async (dispatch:AppDispatch) =>{
        try {
            const birthdays = localStorage.getItem('birthdays') || '[]'
            const json = JSON.parse(birthdays) as IBirthday[]
            const currentUserBirthdays = json.filter(e => e.authorId === username)
            dispatch(birthdayActionCreators.setBirthdays(currentUserBirthdays))
        }catch (e) {
            console.log(e)
        }
    }
}