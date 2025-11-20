import React from 'react';
import { Home, Users, User as UserIcon, Plus } from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onSwitchTab: (tab: NavTab) => void;
  onOpenCreate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, onSwitchTab, onOpenCreate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-bg/90 backdrop-blur-lg border-t border-white/5 px-6 pb-8 pt-4 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        
        <button 
          onClick={() => onSwitchTab('feed')}
          className={`flex flex-col items-center gap-1 transition ${currentTab === 'feed' ? 'text-brand-400' : 'text-dark-muted'}`}
        >
          <Home size={24} strokeWidth={currentTab === 'feed' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Feed</span>
        </button>

        <button 
          onClick={() => onSwitchTab('friends')}
          className={`flex flex-col items-center gap-1 transition ${currentTab === 'friends' ? 'text-brand-400' : 'text-dark-muted'}`}
        >
          <Users size={24} strokeWidth={currentTab === 'friends' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Friends</span>
        </button>

        {/* Floating Action Button for Create - Situated slightly above */}
        <div className="relative -top-6">
          <button 
            onClick={onOpenCreate}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-xl shadow-brand-500/20 hover:bg-brand-50 transition transform active:scale-90 ring-4 ring-dark-bg"
          >
            <Plus size={32} strokeWidth={3} />
          </button>
        </div>

        <button 
          onClick={() => onSwitchTab('profile')}
          className={`flex flex-col items-center gap-1 transition ${currentTab === 'profile' ? 'text-brand-400' : 'text-dark-muted'}`}
        >
          <UserIcon size={24} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>

        {/* Placeholder to balance spacing because we have 4 slots essentially */}
        <div className="w-8"></div> 
      </div>
      {/* Adjust grid layout fix */}
      <style>{`
        nav > div {
          display: grid;
          grid-template-columns: 1fr 1fr auto 1fr;
          gap: 20px;
        }
        .w-8 { display: none; } 
      `}</style>
    </nav>
  );
};

export default Navbar;