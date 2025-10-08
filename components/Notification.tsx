import React from 'react';
import { Info } from 'lucide-react';

interface NotificationProps {
  message: string;
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  return (
    <div
      aria-live="assertive"
      className={`absolute top-6 start-1/2 transform -translate-x-1/2 rtl:translate-x-1/2 w-11/12 max-w-sm transition-all duration-500 ease-in-out z-50
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`
      }
    >
      <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200/50">
        <div className="p-1.5 bg-blue-100 rounded-full">
            <Info size={20} className="text-blue-600" />
        </div>
        <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
      </div>
    </div>
  );
};

export default Notification;