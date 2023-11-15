import React, { useState, useEffect } from "react";
import { getFirebaseToken } from "../firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);
  console.log("Token found", isTokenFound);
  // To load once
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getFirebaseToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;