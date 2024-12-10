import { IoSettingsOutline, IoNotificationsOutline, IoAddOutline, IoLogOutOutline } from 'react-icons/io5';
import { auth } from '../../lib/firebase';

interface AppHeaderProps {
  onAddTransaction: () => void;
}

export function AppHeader({ onAddTransaction }: AppHeaderProps) {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <header className="bg-emerald-500 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">TODAY IS</p>
            <h2 className="text-xl font-semibold">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
            </h2>
          </div>
          <div className="flex space-x-4">
            <button 
              className="p-2 hover:bg-emerald-600 rounded-full flex items-center space-x-2"
              onClick={onAddTransaction}
            >
              <IoAddOutline size={24} />
              <span className="hidden sm:inline">Add Transaction</span>
            </button>
            <button className="p-2 hover:bg-emerald-600 rounded-full">
              <IoSettingsOutline size={24} />
            </button>
            <button className="p-2 hover:bg-emerald-600 rounded-full">
              <IoNotificationsOutline size={24} />
            </button>
            <button 
              className="p-2 hover:bg-emerald-600 rounded-full"
              onClick={handleSignOut}
            >
              <IoLogOutOutline size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}