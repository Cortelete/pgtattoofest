
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ModalType } from './types';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import { InstagramIcon, WhatsAppIcon, MapPinIcon, CameraIcon, InfoIcon, UsersIcon, CodeIcon, HotelIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from './components/icons';

const DEV_WHATSAPP = "5541988710303";
const EVENT_WHATSAPP = "5542999126198";

const AboutModalContent: React.FC = () => (
    <div className="prose prose-invert max-w-none text-gray-300 max-h-[70vh] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold animate-text-gradient mb-4 text-center">🖋️ O que é a PG TATTOO FEST?</h2>
        <p className="text-lg text-center mb-6">A Convenção de Tatuagem de Ponta Grossa</p>

        <div className="space-y-4">
            <p>A <strong>PG Tattoo Fest</strong> é uma convenção anual de tatuagem, arte e cultura alternativa realizada em Ponta Grossa, Paraná. O evento reúne tatuadores renomados, artistas visuais, músicos e entusiastas da arte corporal em um ambiente vibrante e acolhedor.</p>
            <p>Mais do que uma feira, a PG Tattoo Fest é uma experiência completa que celebra a liberdade de expressão e a criatividade.</p>
            
            <h3 className="text-xl font-semibold text-red-400 border-l-4 border-red-400 pl-4">🎨 O Evento</h3>
            <p>Durante três dias intensos, o público pode acompanhar competições de tatuagem, apresentações musicais, exposições de arte e muito mais, promovendo a arte e a cultura urbana.</p>
            
            <h3 className="text-xl font-semibold text-red-400 border-l-4 border-red-400 pl-4">📍 Local e Estrutura</h3>
            <p>A convenção acontece no <strong>Clube Verde – Sede Social</strong>, com ampla estrutura, praça de alimentação, palco para shows e ambiente seguro para toda a família.</p>
            
            <h3 className="text-xl font-semibold text-red-400 border-l-4 border-red-400 pl-4">🎤 Atrações e Destaques</h3>
            <p>Conte com mais de 100 tatuadores, concursos, shows, Concurso Miss Tattoo, expositores, suspensão corporal, street art e gastronomia local.</p>
            
            <h3 className="text-xl font-semibold text-red-400 border-l-4 border-red-400 pl-4">💀 Por que Participar?</h3>
            <p>É uma celebração da arte em sua forma mais autêntica. O ponto de encontro de quem vive e respira cultura alternativa.</p>
            
            <h3 className="text-xl font-semibold text-red-400 border-l-4 border-red-400 pl-4">📅 Próxima Edição</h3>
            <p className="font-bold">06, 07 e 08 de março de 2026 com o tema “Fiesta Mexicana”. Prepare-se!</p>
        </div>
    </div>
);

const LocationModalContent: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold text-center mb-4 animate-text-gradient">Localização</h2>
        <p className="text-center text-gray-300 mb-4">Clube Verde (centro) - Ponta Grossa PR</p>
        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-red-700/50">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.337190011504!2d-50.160128388836516!3d-25.09033397766629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81a3fcfb972ef%3A0x77e544310d9ba50c!2sClube%20Verde%20Sede%20Social!5e0!3m2!1spt-BR!2sbr!4v1719258284699!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a href="https://maps.app.goo.gl/29W9hW4c9e4V1Z6f8" target="_blank" rel="noopener noreferrer" className="block w-full text-center mt-4 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">
            Ver no Google Maps
        </a>
    </div>
);


const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [rotation, setRotation] = useState(0);

    const handleLogoClick = () => {
        setRotation(prev => prev + 1800);
    };

    const openModal = (modalType: ModalType) => setActiveModal(modalType);
    const closeModal = () => setActiveModal(null);

    const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const city = formData.get('city') as string;

        const message = encodeURIComponent(`Olá! Gostaria de informações sobre reserva de estande para o PG Tattoo Fest.\n\nNome: ${name}\nCidade: ${city}`);
        window.open(`https://wa.me/${EVENT_WHATSAPP}?text=${message}`, '_blank');
        closeModal();
    };

    const handleDeveloperContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const message = encodeURIComponent(`Olá, vi o link da PG TATTOO FEST e quero um site incrível como esse! Meu nome é ${name}. 🚀`);
        window.open(`https://wa.me/${DEV_WHATSAPP}?text=${message}`, '_blank');
        closeModal();
    };

    const links = [
        { text: "O que é a PG Tattoo Fest", icon: <InfoIcon />, onClick: () => openModal(ModalType.ABOUT) },
        { text: "Instagram", icon: <InstagramIcon />, onClick: () => window.open('https://www.instagram.com/pgtattoofest/', '_blank') },
        { text: "Localização", icon: <MapPinIcon />, onClick: () => openModal(ModalType.LOCATION) },
        { text: "Reserva de Estandes", icon: <WhatsAppIcon />, onClick: () => openModal(ModalType.RESERVATION) },
        { text: "Fotos", icon: <CameraIcon />, onClick: () => openModal(ModalType.PHOTOS) },
        { text: "Hotel Parceiro", icon: <HotelIcon />, onClick: () => openModal(ModalType.HOTEL_PARTNER) },
        { text: "Grupo de Telas", icon: <UsersIcon />, onClick: () => openModal(ModalType.GROUP_INVITE) },
    ];

    const PhotosModalContent: React.FC = () => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const touchStartRef = useRef<number | null>(null);
        const touchEndRef = useRef<number | null>(null);
        const totalImages = 20;
        const minSwipeDistance = 50;

        const nextImage = () => {
            setIsLoading(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
        };

        const prevImage = () => {
            setIsLoading(true);
            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
        };

        const handleTouchStart = (e: React.TouchEvent) => {
            touchEndRef.current = null;
            touchStartRef.current = e.targetTouches[0].clientX;
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            touchEndRef.current = e.targetTouches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (!touchStartRef.current || !touchEndRef.current) return;
            const distance = touchStartRef.current - touchEndRef.current;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;

            if (isLeftSwipe) nextImage();
            else if (isRightSwipe) prevImage();

            touchStartRef.current = null;
            touchEndRef.current = null;
        };

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (activeModal !== ModalType.PHOTOS) return;
                if (e.key === 'ArrowRight') nextImage();
                else if (e.key === 'ArrowLeft') prevImage();
                else if (isFullscreen && e.key === 'Escape') setIsFullscreen(false);
            };
            
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, [activeModal, isFullscreen, currentIndex]);

        useEffect(() => {
            setIsLoading(true);
            const nextSrc = `/${((currentIndex + 1) % totalImages) + 1}.JPG`;
            const prevSrc = `/${((currentIndex - 1 + totalImages) % totalImages) + 1}.JPG`;
            new Image().src = nextSrc;
            new Image().src = prevSrc;
        }, [currentIndex]);
        
        return (
            <div>
                <h2 className="text-2xl font-bold text-center mb-4 animate-text-gradient">📷 Fotos do Evento</h2>
                <div className="relative w-full aspect-[4/3] bg-black/50 rounded-lg overflow-hidden flex items-center justify-center select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
    
                    {isLoading && <div className="absolute inset-0 flex items-center justify-center text-white z-10">Carregando...</div>}
                    
                    <img
                        src={`/${currentIndex + 1}.JPG`}
                        alt={`Foto ${currentIndex + 1} do PG Tattoo Fest`}
                        className={`max-h-full max-w-full object-contain cursor-pointer transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100 hover:scale-105'}`}
                        onClick={() => setIsFullscreen(true)}
                        onLoad={() => setIsLoading(false)}
                    />
                    
                    <button aria-label="Imagem anterior" onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-red-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 z-20">
                        <ChevronLeftIcon />
                    </button>
                    <button aria-label="Próxima imagem" onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-red-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 z-20">
                        <ChevronRightIcon />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-20">
                        {currentIndex + 1} / {totalImages}
                    </div>
                </div>
    
                {isFullscreen && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
                        <div className="relative w-full h-full p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                            
                            <img
                                src={`/${currentIndex + 1}.JPG`}
                                alt={`Foto ${currentIndex + 1} do PG Tattoo Fest`}
                                className="max-h-[95vh] max-w-[95vw] object-contain select-none shadow-2xl shadow-red-500/50"
                            />
    
                            <button aria-label="Fechar tela cheia" onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-red-700/80 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-red-500">
                                <XIcon />
                            </button>
                            <button aria-label="Imagem anterior" onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-red-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50">
                                <ChevronLeftIcon />
                            </button>
                            <button aria-label="Próxima imagem" onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-red-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50">
                                <ChevronRightIcon />
                            </button>
                             <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-md">
                                {currentIndex + 1} / {totalImages}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case ModalType.ABOUT:
                return <AboutModalContent />;
            case ModalType.LOCATION:
                return <LocationModalContent />;
            case ModalType.PHOTOS:
                return <PhotosModalContent />;
            case ModalType.RESERVATION:
                return (
                    <form onSubmit={handleReservationSubmit}>
                        <h2 className="text-2xl font-bold text-center mb-4 animate-text-gradient">Reserva de Estande</h2>
                        <p className="text-center text-gray-300 mb-6">Preencha seus dados para entrar em contato.</p>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Seu Nome Completo" required className="w-full p-3 bg-red-950/50 border border-red-600/50 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                            <input name="city" type="text" placeholder="Sua Cidade" required className="w-full p-3 bg-red-950/50 border border-red-600/50 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full text-center mt-6 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">Enviar para WhatsApp</button>
                    </form>
                );
            case ModalType.GROUP_INVITE:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-4 animate-text-gradient">Grupo de Telas PG Tattoo Fest</h2>
                        <p className="text-center text-gray-300 mb-6">Participe do nosso grupo exclusivo para artistas e entusiastas para discutir e compartilhar telas e artes.</p>
                        <a href="https://chat.whatsapp.com/GOKZhjfstJ68TvEPcmd0jL" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                            Entrar no Grupo
                        </a>
                    </div>
                );
            case ModalType.DEVELOPER:
                 return (
                    <form onSubmit={handleDeveloperContactSubmit}>
                        <h2 className="text-2xl font-bold text-center mb-2 animate-text-gradient">Contato do Desenvolvedor</h2>
                         <p className="text-center text-gray-400 mb-4">Desenvolvido por <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-bold animate-text-gradient hover:opacity-80 transition-opacity">InteligenciArte.IA ✨</a></p>
                        <p className="text-center text-gray-300 mb-6">Quer um site incrível como esse? Fale comigo! 🚀</p>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Seu Nome" required className="w-full p-3 bg-red-950/50 border border-red-600/50 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full text-center mt-6 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">Chamar no WhatsApp</button>
                    </form>
                );
            case ModalType.HOTEL_PARTNER:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-4 animate-text-gradient">🏨 Hotel Parceiro</h2>
                        <p className="text-center text-gray-300 mb-6">
                            Garanta sua estadia com condições especiais no hotel parceiro do evento. Entre em contato para mais informações e reservas.
                        </p>
                        <a href={`https://wa.me/${EVENT_WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de informações sobre o hotel parceiro do PG Tattoo Fest.')}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Consultar Condições
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-red-950 via-[#330000] to-black animate-gradient text-white flex flex-col items-center justify-between p-2 font-sans">
            <main className="w-full max-w-md mx-auto flex-grow flex flex-col items-center justify-center">
                <div className="w-full bg-black bg-opacity-20 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl shadow-red-900/40 border border-red-700/30">
                    <div className="text-center">
                        <img
                            src="/logo.png"
                            alt="PG Tattoo Fest Logo"
                            className="w-52 h-52 sm:w-60 sm:h-60 mx-auto cursor-pointer hover:scale-105 transition-transform duration-[1200ms] ease-out"
                            style={{ transform: `rotateY(${rotation}deg)` }}
                            onClick={handleLogoClick}
                        />
                        <p className="text-sm sm:text-base text-gray-300 tracking-wider -mt-4">5ª EDIÇÃO | 06,07,08 de MARÇO de 2026</p>
                        <p className="mt-0 text-base sm:text-lg text-white font-serif tracking-wider uppercase">EDIÇÃO ESPECIAL | FIESTA MEXICANA</p>
                    </div>
                    <div className="mt-4">
                       {links.map((link) => (
                          <LinkButton key={link.text} icon={link.icon} text={link.text} onClick={link.onClick} />
                       ))}
                    </div>
                </div>
            </main>
            <footer className="text-center py-2">
                <button onClick={() => openModal(ModalType.DEVELOPER)} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                    Desenvolvido por <strong className="animate-text-gradient">InteligenciArte.IA</strong> ✨
                </button>
            </footer>
            <Modal isOpen={activeModal !== null} onClose={closeModal}>
                {renderModalContent()}
            </Modal>
        </div>
    );
};

export default App;
