// Copiado do Github abaixo - Rafael

// import Header from "./Header"; TIRAR COMENTARIO
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      {/* <Header /> */}
      <Outlet />
    </div>
  );
}

// Copiado do Github acima - Rafael