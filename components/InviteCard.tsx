import React, { useState, useEffect } from 'react';
import { Invite, User } from '../types';
import { Clock, MapPin, Users, Check } from 'lucide-react';

interface InviteCardProps {
  invite: Invite;
  currentUser: User;
  onJoin: (inviteId: string) => void;
}

const InviteCard: React.FC<InviteCardProps> = ({ invite, currentUser, onJoin }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  const hasJoined = invite.attendees.includes(currentUser.id);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = invite.expiresAt - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft('Expired');
        clearInterval(timer);
      } else {
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes % 60}m left`);
        } else {
          setTimeLeft(`${minutes}m left`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [invite.expiresAt]);

  if (isExpired) return null;

  return (
    <div className="w-full bg-dark-card border border-white/5 rounded-2xl p-5 mb-4 shadow-lg relative overflow-hidden">
      
      {/* Accent Gradient Bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-brand-600"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3 pl-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={invite.creator.avatarUrl} 
              alt={invite.creator.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-dark-bg" 
            />
            <div className="absolute -bottom-1 -right-1 bg-dark-card rounded-full p-0.5">
              <span className="text-sm">{invite.emoji}</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">{invite.activity}</h3>
            <p className="text-xs text-dark-muted">by {invite.creator.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md">
          <Clock size={12} className={timeLeft.includes('m left') && !timeLeft.includes('h') ? 'text-red-400' : 'text-brand-400'} />
          <span className={`text-xs font-mono ${timeLeft.includes('m left') && !timeLeft.includes('h') ? 'text-red-400' : 'text-brand-400'}`}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="pl-2 mb-4">
        <p className="text-slate-200 text-sm italic">"{invite.caption}"</p>
      </div>

      {/* Footer / Action */}
      <div className="pl-2 flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-dark-muted" />
          <span className="text-xs text-dark-muted">
            {invite.attendees.length > 0 
              ? `${invite.attendees.length} down` 
              : 'Be the first'}
          </span>
          
          {/* Avatars of attendees (visual flair) */}
          <div className="flex -space-x-2 ml-2">
            {invite.attendees.slice(0, 3).map((att, idx) => (
                <div key={idx} className="w-5 h-5 rounded-full bg-brand-500 border border-dark-card flex items-center justify-center text-[8px] text-white">
                  {/* In a real app we'd lookup user avatar, here just placeholder */}
                  ✓
                </div>
            ))}
            {invite.attendees.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-slate-700 border border-dark-card flex items-center justify-center text-[8px] text-white">
                +{invite.attendees.length - 3}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onJoin(invite.id)}
          disabled={hasJoined}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all active:scale-95 ${
            hasJoined 
              ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default' 
              : 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-900/40'
          }`}
        >
          {hasJoined ? (
            <>
              <Check size={16} />
              I'm in
            </>
          ) : (
            "I'm down"
          )}
        </button>
      </div>
    </div>
  );
};

export default InviteCard;