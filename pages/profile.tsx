import { useRouter } from "next/router";
import { useCurrentUser } from "../src/hooks/auth/useCurrentUser";
import { useLogout } from "../src/hooks/auth/useLogout";

export default function Profile() {
  const currentUser = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-2xl">Welcome back</p>
      <div className="font-semibold">You are: {currentUser?.username}</div>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
