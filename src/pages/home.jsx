import React from "react";
import { useRef, useEffect } from "react";
import { firestore, onMessageListener } from "../firebaseInit";
import { addDoc, collection } from "@firebase/firestore";
import { messaging } from "../firebaseInit";
import { getToken } from 'firebase/messaging'
import { useState } from "react";
import ReactNotificationComponent from "../components/ReactNofication";
import Notifications from "../components/Notifications"

export default function Home() {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: "", body: "" });

    onMessageListener()
        .then((payload) => {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            console.log("payload", payload);
        })
        .catch((err) => console.log("failed: ", err));
        async function saveTokenToDatabse (token){
        const ref = collection(firestore, "token");
            let data = { token: token}
            try {
                addDoc(ref, data);
            } catch (e) {
                console.log(e)
            }

    }

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            // Generate Token
            const token = await getToken(messaging, { vapidKey: 'BBKhGZ7DH2q_1a3uIWpoCApgQVjCTpjEoUWbcSWUp1mk9pg7mEZvoLgE7wP-5ILoTDc-p8hKATs8_RPO1yyHI_Y' })
            saveTokenToDatabse(token)
        } else if (permission === "denied") {
            alert("You denied")
        }
    }

    useEffect(() => {
        requestPermission()
    }, [])

    const messageRef = useRef();
    const ref = collection(firestore, "new");
    const handleSave = async (e) => {
        e.preventDefault();
        let data = { message: messageRef.current.value }
        try {
            addDoc(ref, data);

        } catch (e) {
            console.log(e)
        }
    }


    return (

        <div>
            {show && (
                <ReactNotificationComponent
                    title={notification.title}
                    body={notification.body}
                />
            )}
            {/* <Notifications /> */}
            <form onSubmit={handleSave}>
                <label>Hello - Enter a Message</label>
                <input type="text" ref={messageRef}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}