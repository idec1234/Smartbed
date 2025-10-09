
import React from 'react';
import { Home, Zap, Settings, User } from 'lucide-react';
import { View } from '../types';
import { useLanguage } from '../App';

interface BottomNavBarProps {
    activeView: View;
    onNavigate: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    return (
        <button onClick={onClick} className={`flex flex-col items-center transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}>
            {/* FIX: Add a more specific type assertion to inform TypeScript that the cloned element accepts a className prop. */}
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: `fill-current ${isActive ? 'text-blue-600' : 'text-transparent'}` })}
            <span className={`text-xs mt-1 font-bold`}>{label}</span>
        </button>
    );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate }) => {
    const { t } = useLanguage();

    const navItems = [
        { view: View.HOME, label: t('home'), icon: <Home size={24} /> },
        { view: View.ENERGY, label: t('energy'), icon: <Zap size={24} /> },
        { view: View.SETTINGS, label: t('settings'), icon: <Settings size={24} /> },
        { view: View.PROFILE, label: t('profile'), icon: <User size={24} /> },
    ];
    
    return (
        <nav className="absolute bottom-6 start-1/2 transform -translate-x-1/2 rtl:translate-x-1/2 flex w-[342px] justify-around items-center p-4 bg-[#FFFEF5]/80 backdrop-blur-lg rounded-full shadow-xl z-20">
            {navItems.map(item => (
                 <button 
                    key={item.view} 
                    onClick={() => onNavigate(item.view)} 
                    className={`flex flex-col items-center transition-colors ${activeView === item.view ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                >
                    {/* FIX: Add a more specific type assertion to inform TypeScript that the cloned element accepts a className prop. */}
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { 
                        className: `transition-all ${activeView === item.view ? 'fill-blue-600' : ''}`
                    })}
                    <span className={`text-xs mt-1 ${activeView === item.view ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
                 </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
