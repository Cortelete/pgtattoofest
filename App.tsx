
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ModalType } from './types';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import { InstagramIcon, WhatsAppIcon, MapPinIcon, CameraIcon, InfoIcon, UsersIcon, CodeIcon } from './components/icons';

const subtitles = [
  "A arte que liberta a alma e marca a pele.",
  "Porque toda tatuagem é uma história esperando para ser contada.",
  "Um festival que une artistas, inspira mentes e celebra a cultura.",
  "Coragem não é a ausência do medo, é a persistência apesar do medo.",
  "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado.",
  "Porque dEle e por Ele, e para Ele, são todas as coisas; glória, pois, a Ele eternamente. Amém. (Romanos 11:36)"
];

const DEV_WHATSAPP = "5541988710303";
const EVENT_WHATSAPP = "5542999126198";

const AboutModalContent: React.FC = () => (
    <div className="prose prose-invert max-w-none text-gray-300 max-h-[70vh] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 mb-4 text-center">🖋️ O que é a PG TATTOO FEST?</h2>
        <p className="text-lg text-center mb-6">A Convenção de Tatuagem de Ponta Grossa</p>

        <div className="space-y-4">
            <p>A <strong>PG Tattoo Fest</strong> é uma convenção anual de tatuagem, arte e cultura alternativa realizada em Ponta Grossa, Paraná. O evento reúne tatuadores renomados, artistas visuais, músicos e entusiastas da arte corporal em um ambiente vibrante e acolhedor.</p>
            <p>Mais do que uma feira, a PG Tattoo Fest é uma experiência completa que celebra a liberdade de expressão e a criatividade.</p>
            
            <h3 className="text-xl font-semibold text-orange-400 border-l-4 border-orange-400 pl-4">🎨 O Evento</h3>
            <p>Durante três dias intensos, o público pode acompanhar competições de tatuagem, apresentações musicais, exposições de arte e muito mais, promovendo a arte e a cultura urbana.</p>
            
            <h3 className="text-xl font-semibold text-orange-400 border-l-4 border-orange-400 pl-4">📍 Local e Estrutura</h3>
            <p>A convenção acontece no <strong>Clube Verde – Sede Social</strong>, com ampla estrutura, praça de alimentação, palco para shows e ambiente seguro para toda a família.</p>
            
            <h3 className="text-xl font-semibold text-orange-400 border-l-4 border-orange-400 pl-4">🎤 Atrações e Destaques</h3>
            <p>Conte com mais de 100 tatuadores, concursos, shows, Concurso Miss Tattoo, expositores, suspensão corporal, street art e gastronomia local.</p>
            
            <h3 className="text-xl font-semibold text-orange-400 border-l-4 border-orange-400 pl-4">💀 Por que Participar?</h3>
            <p>É uma celebração da arte em sua forma mais autêntica. O ponto de encontro de quem vive e respira cultura alternativa.</p>
            
            <h3 className="text-xl font-semibold text-orange-400 border-l-4 border-orange-400 pl-4">📅 Próxima Edição</h3>
            <p className="font-bold">06, 07 e 08 de março de 2026 com o tema “Fiesta Mexicana”. Prepare-se!</p>
        </div>
    </div>
);

const LocationModalContent: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Localização</h2>
        <p className="text-center text-gray-300 mb-4">Clube Verde (centro) - Ponta Grossa PR</p>
        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-purple-500/50">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.337190011504!2d-50.160128388836516!3d-25.09033397766629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81a3fcfb972ef%3A0x77e544310d9ba50c!2sClube%20Verde%20Sede%20Social!5e0!3m2!1spt-BR!2sbr!4v1719258284699!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a href="https://maps.app.goo.gl/29W9hW4c9e4V1Z6f8" target="_blank" rel="noopener noreferrer" className="block w-full text-center mt-4 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">
            Ver no Google Maps
        </a>
    </div>
);

const App: React.FC = () => {
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const [rotation, setRotation] = useState(0);
    const spinSpeed = useRef(0);
    // FIX: Initialize useRef with null and update the type to allow null.
    // The original `useRef<number>()` is incorrect because it requires an initial value.
    const animationFrameId = useRef<number | null>(null);

    const handleLogoClick = () => {
        spinSpeed.current += 15;
        if (spinSpeed.current > 60) spinSpeed.current = 60;
        
        const animate = () => {
            setRotation(prev => prev + spinSpeed.current);
            spinSpeed.current *= 0.98; // Damping factor

            if (Math.abs(spinSpeed.current) > 0.1) {
                animationFrameId.current = requestAnimationFrame(animate);
            } else {
                spinSpeed.current = 0;
                // Snap to nearest 360 to stop upright
                setRotation(r => Math.round(r / 360) * 360);
            }
        };

        if (Math.abs(spinSpeed.current) > 15) { // only start new animation if not already spinning fast
            // FIX: Add a guard to ensure animationFrameId.current is not null before calling cancelAnimationFrame.
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
             animate();
        }
    };

    useEffect(() => {
        const subtitleInterval = setInterval(() => {
            setSubtitleIndex(prev => (prev + 1) % subtitles.length);
        }, 7000);
        return () => {
          clearInterval(subtitleInterval);
          if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const openModal = (modalType: ModalType) => setActiveModal(modalType);
    const closeModal = () => setActiveModal(null);

    const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const age = parseInt(formData.get('age') as string, 10);
        const interest = formData.get('interest') as string;

        if (age < 18) {
            openModal(ModalType.AGE_WARNING);
            return;
        }

        const message = encodeURIComponent(`Olá! Gostaria de informações sobre reserva de estande para o PG Tattoo Fest.\n\nNome: ${name}\nIdade: ${age}\nInteresse: ${interest}`);
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
        { text: "O que é a PG TATTOO FEST", icon: <InfoIcon />, onClick: () => openModal(ModalType.ABOUT) },
        { text: "Instagram", icon: <InstagramIcon />, onClick: () => window.open('https://www.instagram.com/pgtattoofest/', '_blank') },
        { text: "Localização", icon: <MapPinIcon />, onClick: () => openModal(ModalType.LOCATION) },
        { text: "Reservas de Estandes", icon: <WhatsAppIcon />, onClick: () => openModal(ModalType.RESERVATION) },
        { text: "Fotos do Evento", icon: <CameraIcon />, onClick: () => window.open('https://drive.google.com/drive/folders/1Je4XS5AR5NST3PtOHFtagaEZ1tMHjavu', '_blank') },
        { text: "Grupo WhatsApp TELAS", icon: <UsersIcon />, onClick: () => openModal(ModalType.GROUP_INVITE) },
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
                        <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Reserva de Estande</h2>
                        <p className="text-center text-gray-300 mb-6">Preencha seus dados para entrar em contato.</p>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Seu Nome Completo" required className="w-full p-3 bg-gray-800 border border-purple-500/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                            <input name="age" type="number" placeholder="Sua Idade" required className="w-full p-3 bg-gray-800 border border-purple-500/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                            <input name="interest" type="text" placeholder="Qual seu interesse? (Ex: Tatuar, Expor)" required className="w-full p-3 bg-gray-800 border border-purple-500/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full text-center mt-6 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">Enviar para WhatsApp</button>
                    </form>
                );
            case ModalType.GROUP_INVITE:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Grupo de Telas PG Tattoo Fest</h2>
                        <p className="text-center text-gray-300 mb-6">Participe do nosso grupo exclusivo para artistas e entusiastas para discutir e compartilhar telas e artes.</p>
                        <a href="https://chat.whatsapp.com/GOKZhjfstJ68TvEPcmd0jL" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                            Entrar no Grupo
                        </a>
                    </div>
                );
            case ModalType.DEVELOPER:
                 return (
                    <form onSubmit={handleDeveloperContactSubmit}>
                        <h2 className="text-2xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Contato do Desenvolvedor</h2>
                         <p className="text-center text-gray-400 mb-4">Desenvolvido por <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-400 hover:underline">InteligenciArte.IA ✨</a></p>
                        <p className="text-center text-gray-300 mb-6">Quer um site incrível como esse? Fale comigo! 🚀</p>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Seu Nome" required className="w-full p-3 bg-gray-800 border border-purple-500/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full text-center mt-6 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">Chamar no WhatsApp</button>
                    </form>
                );
            case ModalType.AGE_WARNING:
                return (
                     <div>
                        <h2 className="text-2xl font-bold text-center mb-4 text-red-500">Atenção!</h2>
                        <p className="text-center text-gray-300 mb-6">Para prosseguir, você deve ser maior de 18 anos. Peça a um responsável para concluir o contato.</p>
                        <button onClick={closeModal} className="w-full text-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                            Entendi
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black animate-gradient text-white flex flex-col items-center justify-between p-4 font-sans">
            <main className="w-full max-w-md mx-auto flex-grow flex flex-col items-center justify-center">
                <div className="w-full bg-black bg-opacity-20 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-900/40 border border-purple-500/30">
                    <div className="text-center">
                        <img
                            src="/logo.png"
                            alt="PG Tattoo Fest Logo"
                            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full border-2 border-purple-500/50 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                            style={{ transform: `rotateY(${rotation}deg)` }}
                            onClick={handleLogoClick}
                        />
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 animate-gradient">
                            PG TATTOO FEST
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-gray-300">5ª EDIÇÃO | 06,07,08 de MARÇO de 2026</p>
                        <p className="mt-1 text-orange-400 font-semibold">🌵 Edição Especial Fiesta Mexicana 🇲🇽</p>
                        <div key={subtitleIndex} className="h-12 flex items-center justify-center mt-4 animate-fade-in">
                           <p className="text-gray-200 text-sm md:text-base italic">"{subtitles[subtitleIndex]}"</p>
                        </div>
                    </div>
                    <div className="mt-6">
                       {links.map((link) => (
                          <LinkButton key={link.text} icon={link.icon} text={link.text} onClick={link.onClick} />
                       ))}
                    </div>
                </div>
            </main>
            <footer className="text-center py-4">
                <button onClick={() => openModal(ModalType.DEVELOPER)} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    Desenvolvido por <strong>InteligenciArte.IA</strong> ✨
                </button>
            </footer>
            <Modal isOpen={activeModal !== null} onClose={closeModal}>
                {renderModalContent()}
            </Modal>
            <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out;
            }
            `}</style>
        </div>
    );
};

export default App;
