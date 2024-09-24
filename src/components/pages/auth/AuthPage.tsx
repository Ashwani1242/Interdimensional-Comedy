import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
    <div className="h-screen w-screen px-40 relative py-20">
      <Outlet />
    </div>
  );
}

export default AuthPage;
