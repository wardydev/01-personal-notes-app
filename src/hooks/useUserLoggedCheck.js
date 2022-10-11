import { useEffect, useState } from "react";
import { getUserLogged } from "../utils/network-data";

const useUserLoggedCheck = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    try {
      getUserLogged().then((data) => setUserData(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { userData };
};

export default useUserLoggedCheck;
