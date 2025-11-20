import React, { useState, useEffect, useRef } from 'react';
import { User, Invite, NavTab } from './types';
import { MOCK_FRIENDS, ACTIVITY_PRESETS } from './constants';
import Navbar from './components/Navbar';
import InviteCard from './components/InviteCard';
import CreateInvite from './components/CreateInvite';
import Friends from './components/Friends';
import { Zap, LogOut, Settings } from 'lucide-react';

// Mock initial user
const INITIAL_USER: User = {
  id: 'u1',
  name: 'You',
  handle: '@me',
  avatarUrl: 'https://picsum.photos/200/200',
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authName, setAuthName] = useState('');
  const [currentTab, setCurrentTab] = useState<NavTab>('feed');
  const [showCreate, setShowCreate] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  
  // Notification state (simple toast)
  const [toast, setToast] = useState<{msg: string, show: boolean}>({ msg: '', show: false });

  // Auth Flow
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName.trim()) return;
    setUser({
      ...INITIAL_USER,
      name: authName,
      handle: `@${authName.toLowerCase().replace(/\s/g, '')}`,
    });
  };

  // Create Invite
  const handleCreateInvite = (activity: string, emoji: string, caption: string, duration: number) => {
    if (!user) return;
    
    const newInvite: Invite = {
      id: Date.now().toString(),
      creator: user,
      activity,
      emoji,
      caption,
      createdAt: Date.now(),
      expiresAt: Date.now() + duration,
      attendees: [user.id],
    };

    setInvites(prev => [newInvite, ...prev]);
    setShowCreate(false);
    setCurrentTab('feed');
  };

  // Join Invite
  const handleJoinInvite = (inviteId: string) => {
    if (!user) return;
    setInvites(prev => prev.map(inv => {
      if (inv.id === inviteId) {
        // Toggle join (simple version: just join)
        if (!inv.attendees.includes(user.id)) {
          return { ...inv, attendees: [...inv.attendees, user.id] };
        }
      }
      return inv;
    }));
  };

  // Simulate Incoming Invites (Poller)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      // 20% chance to receive an invite every 30s
      if (Math.random() > 0.8) {
        const randomFriend = MOCK_FRIENDS[Math.floor(Math.random() * MOCK_FRIENDS.length)];
        const randomActivity = ACTIVITY_PRESETS[Math.floor(Math.random() * ACTIVITY_PRESETS.length)];
        
        const newInvite: Invite = {
          id: Date.now().toString() + Math.random(),
          creator: randomFriend,
          activity: randomActivity.label,
          emoji: randomActivity.emoji,
          caption: randomActivity.defaultCaption,
          createdAt: Date.now(),
          expiresAt: Date.now() + 1000 * 60 * 60 * 2, // 2 hours
          attendees: [],
        };

        setInvites(prev => [newInvite, ...prev]);
        
        // Show Toast
        setToast({ msg: `${randomFriend.name} is down for ${randomActivity.label}!`, show: true });
        setTimeout(() => setToast({ msg: '', show: false }), 3000);
      }
    }, 10000); // Check every 10s

    return () => clearInterval(interval);
  }, [user]);

  // Prune Expired Invites
  useEffect(() => {
    const interval = setInterval(() => {
      setInvites(prev => prev.filter(inv => inv.expiresAt > Date.now()));
    }, 60000); // Check every min
    return () => clearInterval(interval);
  }, []);


  // -- RENDERING --

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] bg-brand-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="z-10 w-full max-w-sm text-center">
          <div className="mb-8 inline-block p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <Zap size={48} className="text-brand-400 mx-auto" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">Who's Down?</h1>
          <p className="text-dark-muted mb-10 text-lg">Spontaneous hangouts only.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              placeholder="What's your name?" 
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center text-white placeholder-slate-500 focus:border-brand-400 outline-none transition text-lg"
              value={authName}
              onChange={(e) => setAuthName(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!authName.trim()}
              className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 shadow-lg shadow-brand-900/50"
            >
              Let's Go
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans pb-24 selection:bg-brand-500/30">
      
      {/* Toast Notification */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
         <div className="bg-brand-500 text-white px-6 py-3 rounded-full shadow-xl shadow-brand-900/50 font-bold text-sm flex items-center gap-2">
           <Zap size={16} fill="currentColor" />
           {toast.msg}
         </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-dark-bg/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
          <span className="text-brand-400">WD?</span>
        </h1>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 p-[2px]">
          <img src={user.avatarUrl} alt="me" className="w-full h-full rounded-full object-cover bg-black" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-md mx-auto">
        {currentTab === 'feed' && (
          <div className="p-6 animate-slide-up">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="text-3xl font-black text-white tracking-tight">Live Now</h2>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest bg-brand-900/30 px-2 py-1 rounded">
                {invites.length} Active
              </span>
            </div>

            {invites.length === 0 ? (
              <div className="text-center py-20 opacity-50">
                <p className="text-4xl mb-4">😴</p>
                <p>No one is doing anything.</p>
                <p className="text-sm mt-2">Be the first to start something!</p>
              </div>
            ) : (
              invites.map(invite => (
                <InviteCard 
                  key={invite.id} 
                  invite={invite} 
                  currentUser={user} 
                  onJoin={handleJoinInvite} 
                />
              ))
            )}
          </div>
        )}

        {currentTab === 'friends' && <Friends />}

        {currentTab === 'profile' && (
          <div className="p-6 animate-pop-in">
             <h2 className="text-3xl font-black text-white mb-8">Profile</h2>
             <div className="bg-dark-card p-6 rounded-2xl border border-white/5 flex items-center gap-4 mb-6">
               <img src={user.avatarUrl} className="w-20 h-20 rounded-full" alt="Profile" />
               <div>
                 <h3 className="text-xl font-bold">{user.name}</h3>
                 <p className="text-dark-muted">{user.handle}</p>
               </div>
             </div>
             
             <div className="space-y-2">
                <button className="w-full p-4 bg-slate-900/50 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition">
                  <Settings size={20} className="text-dark-muted" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => setUser(null)}
                  className="w-full p-4 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-3 hover:bg-red-500/20 transition"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
             </div>
             
             <div className="mt-10 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20">
                <p className="text-xs text-blue-300 mb-2 font-bold uppercase">Debug Mode</p>
                <button 
                  onClick={() => {
                    const newInvite = {
                      id: Date.now().toString(),
                      creator: MOCK_FRIENDS[0],
                      activity: "Late Night Pizza",
                      emoji: "🍕",
                      caption: "Craving carbs. Who's awake?",
                      createdAt: Date.now(),
                      expiresAt: Date.now() + 3600000,
                      attendees: []
                    };
                    setInvites(prev => [newInvite, ...prev]);
                    setToast({ msg: "New invite simulated!", show: true });
                    setTimeout(() => setToast({ msg: '', show: false }), 2000);
                  }}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Force Incoming Invite
                </button>
             </div>
          </div>
        )}
      </main>

      <Navbar 
        currentTab={currentTab} 
        onSwitchTab={setCurrentTab} 
        onOpenCreate={() => setShowCreate(true)} 
      />

      {showCreate && (
        <CreateInvite 
          currentUser={user} 
          onClose={() => setShowCreate(false)} 
          onCreate={handleCreateInvite} 
        />
      )}

    </div>
  );
}

export default App;