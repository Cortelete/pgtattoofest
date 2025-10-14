
import React from 'react';
import { useState } from 'react';
import { ModalType } from './types';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import { InstagramIcon, WhatsAppIcon, MapPinIcon, CameraIcon, InfoIcon, UsersIcon, CodeIcon, HotelIcon } from './components/icons';

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
        // Adiciona 5 rotações completas (1800 graus) para um giro rápido e satisfatório.
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
        { text: "Fotos", icon: <CameraIcon />, onClick: () => window.open('https://drive.google.com/drive/folders/1Je4XS5AR5NST3PtOHFtagaEZ1tMHjavu', '_blank') },
        { text: "Hotel Parceiro", icon: <HotelIcon />, onClick: () => openModal(ModalType.HOTEL_PARTNER) },
        { text: "Grupo de Telas", icon: <UsersIcon />, onClick: () => openModal(ModalType.GROUP_INVITE) },
    ];

    const renderModalContent = () => {
        switch (activeModal) {
            case ModalType.ABOUT:
                return <AboutModalContent />;
            case ModalType.LOCATION:
                return <LocationModalContent />;
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
        <div className="min-h-screen w-full bg-gradient-to-br from-red-950 via-[#330000] to-black animate-gradient text-white flex flex-col items-center justify-between p-2 sm:p-4 font-sans">
            <main className="w-full max-w-md mx-auto flex-grow flex flex-col items-center justify-center">
                <div className="w-full bg-black bg-opacity-20 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl shadow-red-900/40 border border-red-700/30">
                    <div className="text-center">
                        <img
                            src="/logo.png"
                            alt="PG Tattoo Fest Logo"
                            className="w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto mb-2 cursor-pointer hover:scale-105 transition-transform duration-[1200ms] ease-out"
                            style={{ transform: `rotateY(${rotation}deg)` }}
                            onClick={handleLogoClick}
                        />
                        <p className="mt-2 text-sm sm:text-base text-gray-300 tracking-wider">5ª EDIÇÃO | 06,07,08 de MARÇO de 2026</p>
                        <p className="mt-1 text-base sm:text-lg text-white font-serif tracking-wider uppercase">EDIÇÃO ESPECIAL | FIESTA MEXICANA</p>
                    </div>
                    <div className="mt-6">
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
