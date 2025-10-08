import React, { useState } from 'react';
import { ChevronLeft, Settings, Video, VideoOff, Camera, Mic, ChevronUp, ChevronDown, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../App';

const SecurityCamScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();
    const [isRecording, setIsRecording] = useState(true);
    const [isMicOn, setIsMicOn] = useState(false);

    return (
        <div className="h-full w-full bg-gray-900 text-white flex flex-col p-6 pt-12">
            <header className="flex justify-between items-center z-10">
                <button onClick={onBack} className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                    <ChevronLeft size={24} />
                </button>
                 <h1 className="text-xl font-bold">{t('securityCam')}</h1>
                <button className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                    <Settings size={24} />
                </button>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center my-4 relative">
                <div className="w-full aspect-[4/3] bg-black rounded-2xl overflow-hidden relative shadow-lg shadow-black/50">
                    <img src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2601&auto=format&fit=crop" className="w-full h-full object-cover" alt="Security camera feed" />
                    <div className="absolute top-3 left-3 flex items-center space-x-2 bg-red-600 px-2 py-0.5 rounded-md">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        <span className="text-xs font-bold tracking-wider">LIVE</span>
                    </div>
                </div>
            </main>

            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 p-4 rounded-3xl flex flex-col justify-center items-center backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3">{t('panTilt')}</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div />
                        <button className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center"><ChevronUp size={20} /></button>
                        <div />
                        <button className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center"><ChevronLeftIcon size={20} /></button>
                        <button className="w-10 h-10 bg-white/20 rounded-full flex justify-center items-center"><RotateCcw size={16}/></button>
                        <button className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center"><ChevronRightIcon size={20} /></button>
                        <div />
                        <button className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center"><ChevronDown size={20} /></button>
                        <div />
                    </div>
                 </div>
                 <div className="space-y-4">
                     <button className="w-full h-20 bg-white/10 p-4 rounded-3xl flex items-center justify-center space-x-3 backdrop-blur-sm">
                         <Camera size={24} />
                         <span className="font-semibold">{t('snapshot')}</span>
                     </button>
                      <button 
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`w-full h-20 p-4 rounded-3xl flex items-center justify-center space-x-3 backdrop-blur-sm transition-colors ${isMicOn ? 'bg-blue-500' : 'bg-white/10'}`}>
                         <Mic size={24} />
                         <span className="font-semibold">{t('mic')}</span>
                     </button>
                 </div>
            </div>
            
            <div className="mt-4">
                 <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-full flex items-center justify-center space-x-3 py-4 rounded-full font-bold transition-colors ${isRecording ? 'bg-red-600' : 'bg-white/20'}`}
                >
                    {isRecording ? <VideoOff size={20}/> : <Video size={20}/>}
                    <span>{isRecording ? t('stopRecording') : t('startRecording')}</span>
                </button>
            </div>
            
            <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mt-auto mb-2"></div>
        </div>
    );
};

export default SecurityCamScreen;
