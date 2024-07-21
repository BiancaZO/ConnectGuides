import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-2 px-3 flex flex-col min-h-screen max-w-1xl mx-auto">
      <Header /> 
      <Outlet />
    </div>
  );
}

