const navegacion = document.querySelector('#navegacion');
let isMenuOpen = false;

// Función para alternar el menú móvil
const toggleMobileMenu = () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuOverlay = document.querySelector('#menu-overlay');
    isMenuOpen = !isMenuOpen;

    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    menuOverlay.classList.toggle('hidden', !isMenuOpen);
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
}

// Navbar para la página principal
const crearNavHome = () => {
    navegacion.innerHTML = `
        <nav class="bg-[#4769c2] shadow-lg fixed w-full z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-20 items-center">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center">
                        <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="ml-2 text-white text-2xl font-bold">StayWell</span>
                    </div>

                    <!-- Menú desktop -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#iniciativas" class="text-white hover:text-[#97c76b] transition-colors font-semibold">
                            Iniciativas
                        </a>
                        
                        <a href="#instalaciones" class="text-white hover:text-[#97c76b] transition-colors font-semibold">
                            Instalaciones
                        </a>
                        <a href="/servicios/" class="ml-4 text-sm font-semibold text-[/servicios/4769c2] bg-white py-2 px-4 rounded-full 
                            hover:bg-[#97c76b] hover:text-white transition-colors">
                            Servicios
                        </a>
                    </div>

                    <!-- Botón móvil -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-white hover:text-[#97c76b] focus:outline-none">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Menú móvil -->
            <div id="menu-overlay" class="md:hidden fixed inset-0 bg-black/50 z-40 hidden"></div>
            
            <div id="mobile-menu" class="md:hidden fixed right-4 bg-white rounded-sm shadow-xl z-50 w-64 hidden">
                <div class="py-4">
                    <a href="#servicios" class="block px-6 py-3 text-gray-800 font-semibold hover:bg-gray-100">
                        Servicios
                    </a>
                    <a href="#instalaciones" class="block px-6 py-3 text-gray-800 font-semibold hover:bg-gray-100">
                        Instalaciones
                    </a>
                    <a href="#iniciativas" class="block px-6 py-3 text-gray-800 font-semibold hover:bg-gray-100">
                        Iniciativas
                    </a>
                </div>
            </div>
        </nav>
    `;

    // Event listeners
    document.querySelector('#mobile-menu-button').addEventListener('click', toggleMobileMenu);
    document.querySelector('#menu-overlay').addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer click en enlace
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

// Navbar para login (versión simplificada)
const crearNavLogin = () => {
    navegacion.innerHTML = `
        <nav class="bg-[#4769c2] shadow-lg">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">...</svg>
                        <span class="ml-2 text-white text-xl font-bold"><a href="/">StayWell</a></span>
                    </div>
                    <div class="text-white text-sm font-semibold mr-2">
                        ¿Necesitas ayuda? <a href="#" class="font-semibold hover:text-[#97c76b]">Contáctanos</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

//Navbar para registro (version simplificada)
const crearNavRegistro = () => {
    navegacion.innerHTML = `
        <nav class="bg-[#4769c2] shadow-lg">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">...</svg>
                        <span class="ml-2 text-white text-xl font-bold"><a href="/">StayWell</a></span>
                    </div>
                    <div class="text-white text-sm font-semibold mr-2">
                        ¿Necesitas ayuda? <a href="#" class="font-semibold hover:text-[#97c76b]">Contáctanos</a>
                    </div>
                </div>
            </div>
        </nav>
    `
}

//Navbar para tablero de staff
const crearNavStaffHome = () => {
    navegacion.innerHTML = `
        <nav class="bg-[#4769c2] shadow-lg w-full ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-20 items-center">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center">
                        <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="ml-2 text-white text-2xl font-bold"><a href="/">StayWell</a></span>
                    </div>

                    <!-- Menú desktop -->
                    <div class="hidden md:flex items-center space-x-8">
                    
                        <a href="/staff-profile/" class="text-white hover:text-[#97c76b] transition-colors font-semibold">
                            Perfil
                        </a>
                        <a href="/staff-board/" class="ml-4 text-sm font-semibold text-[#4769c2] bg-white py-2 px-4 rounded-full 
                            hover:bg-[#97c76b] hover:text-white transition-colors">
                            Tablero
                        </a>
                    </div>

                    <!-- Botón móvil -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-white hover:text-[#97c76b] focus:outline-none">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Menú móvil -->
            <div id="menu-overlay" class="md:hidden fixed inset-0 bg-black/50 z-40 hidden"></div>
            
            <div id="mobile-menu" class="md:hidden fixed right-4 bg-white rounded-sm shadow-xl z-50 w-64 hidden">

                <div class="py-4">
                    <a href="/staff-board" class="block px-6 py-3 text-gray-800 hover:bg-gray-100">
                        Tablero
                    </a>
                    <a href="/profile-staff/" class="block px-6 py-3 text-gray-800 hover:bg-gray-100">
                        Perfil
                    </a>
                    
                </div>
            </div>
        </nav>
    `;

    // Add event listeners for staff home
    document.querySelector('#mobile-menu-button').addEventListener('click', toggleMobileMenu);
    document.querySelector('#menu-overlay').addEventListener('click', toggleMobileMenu);

    // Close menu when clicking links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

const crearNavAdminHome = () => { }

const crearNavStaffBoard = () => { }

const crearNavAdminBoard = () => { }



// Control de navegación
if (window.location.pathname === '/') {
    crearNavHome();
} else if (window.location.pathname === '/login/') {
    crearNavLogin();
} else if (window.location.pathname === '/registro/') {
    crearNavRegistro();
} else if (window.location.pathname === '/staff-home/') {
    crearNavStaffHome();
} else if (['/facilities/', '/iniciativas/','/servicios/'].includes(window.location.pathname)){
    crearNavHome()
}