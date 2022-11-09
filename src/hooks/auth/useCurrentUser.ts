import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return user;
};
