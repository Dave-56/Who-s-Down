import React from 'react';
import { User } from '../types';
import { MOCK_FRIENDS } from '../constants';

const Friends: React.FC = () => {
  return (
    <div className="p-6 pb-32 animate-pop-in">
      <h1 className="text-3xl font-black text-white mb-6 tracking-tight">Friends</h1>
      
      <div className="space-y-4">
        {MOCK_FRIENDS.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between bg-dark-card/50 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={friend.avatarUrl} 
                  alt={friend.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-card rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-white">{friend.name}</h3>
                <p className="text-xs text-dark-muted">{friend.handle}</p>
              </div>
            </div>
            <button className="bg-slate-800 text-xs font-bold px-3 py-1.5 rounded-full text-slate-300 hover:bg-slate-700">
              Message
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-dark-muted text-sm">Invite more friends to see what they're up to!</p>
        <button className="mt-4 text-brand-400 font-bold text-sm">Share Link</button>
      </div>
    </div>
  );
};

export default Friends;