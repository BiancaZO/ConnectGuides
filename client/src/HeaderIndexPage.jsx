import {Link} from "react-router-dom";
export default function Header(){
    return (
        
     <div>
            <header className="p-4 flex justify-between items-center bg-white bg-opacity-30 backdrop-blur-lg relative">
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                    <img 
                        src="/assets/header-background.jpg" 
                        alt="Header Background" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                </div>

                {/* Conteúdo do Header */}
                <div className="relative z-10 flex w-full justify-between items-center">
                    <Link to="/" className='flex items-center gap-2'>
                        <img src="/assets/logo.png" alt="Logo" className="w-12 h-12" />
                        <img src="/assets/logoName.png" alt="LogoName" className="w-18 h-6" />
                    </Link>

                    <div className="flex gap-8 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                        <div>Search Location</div>
                        <div className="border border-l border-gray-300"></div>
                        <div>Check-in</div>
                        <div className="border border-l border-gray-300"></div>
                        <div>Check-out</div>
                        <button className="bg-blue-500 text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                    
                    <Link to={'/login'} className="flex items-center gap-2 border-gray-300 rounded-full py-2 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </header>
        </div>
    );
}