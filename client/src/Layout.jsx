import Footer from "./Footer";
import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-1xl mx-auto">
      <Header /> 
      <Outlet />
      <Footer />
    </div>
  );
}

