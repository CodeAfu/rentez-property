import Login from "./login";
import Register from "./register";

export default function Auth() {
  return (
    <div className="px-4 flex gap-2 items-center">
      <Login />
      <Register />
    </div>
  );
}
