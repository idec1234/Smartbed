
import React from 'react';
import { ChevronRight, User, Bell, LifeBuoy, LogOut } from 'lucide-react';
import { useLanguage } from '../App';

const ProfileMenuItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-[#FFFEF5] rounded-2xl shadow-sm hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="p-3 bg-[#F5F3E5] rounded-full">
                {icon}
            </div>
            <span className="font-bold text-gray-800">{label}</span>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
    </button>
);


const ProfileScreen: React.FC = () => {
    const { t } = useLanguage();
    const handleNotImplemented = () => alert('This feature is not yet implemented.');
    // FIX: Corrected a malformed variable declaration. The original code had extraneous lines that created a syntax error.
    const jabrLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAJYCAYAAAA8/VwBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAP+JRefUeF7t/QmAFNl13/1d1dPdM88+szPrGdiBIMggiLhEVcQlVFFEQwQFFUUURNyIEY+oMRqNGI+oiI/KiIeAiiKKiBgiIuCIiCIgA4IMbGAf2NfMPNN9p6u6p/d/3VVdM90zPc/MrGdn9z/lVC93d0/3dPfU9at7qu7u+Rzud7v7eUAAEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAB";

    return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
        <header className="flex justify-center items-center relative">
            <h1 className="text-xl font-bold text-gray-900">{t('profile')}</h1>
        </header>

        <main className="flex-1 overflow-y-auto pt-8 pb-28 space-y-8 scrollbar-hide">
            {/* User Info */}
            <div className="flex flex-col items-center text-center">
                <img src="https://picsum.photos/seed/user-avatar/96/96" alt="User Avatar" className="w-24 h-24 rounded-full" />
                <p className="font-bold text-2xl text-gray-900 mt-4">Andrew</p>
                <p className="text-gray-500">andrew@email.com</p>
            </div>

            {/* Menu */}
            <div className="space-y-3">
                <ProfileMenuItem 
                    icon={<User size={20} className="text-blue-500" />} 
                    label="Edit Profile" 
                    onClick={handleNotImplemented} 
                />
                <ProfileMenuItem 
                    icon={<Bell size={20} className="text-orange-500" />} 
                    label="Notifications" 
                    onClick={handleNotImplemented}
                />
                <ProfileMenuItem 
                    icon={<LifeBuoy size={20} className="text-green-500" />} 
                    label="Help & Support" 
                    onClick={handleNotImplemented}
                />
                 <ProfileMenuItem 
                    icon={<LogOut size={20} className="text-red-500" />} 
                    label="Logout"
                    onClick={() => alert('Logout clicked!')}
                />
            </div>

            {/* JABR Branding Section */}
            <div className="flex flex-col items-center justify-center pt-8 space-y-2">
                <img src={jabrLogo} alt="JABR TECHNOLOGY Logo" className="w-32" />
                <p className="text-sm text-gray-500">{t('developedBy')}</p>
            </div>
        </main>
    </div>
    );
};

export default ProfileScreen;