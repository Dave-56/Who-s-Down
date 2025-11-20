import React, { useState } from 'react';
import { ActivityPreset, User } from '../types';
import { ACTIVITY_PRESETS, TIME_OPTIONS } from '../constants';
import { generateInviteCaption } from '../services/geminiService';
import { X, Sparkles, Clock, Send } from 'lucide-react';

interface CreateInviteProps {
  currentUser: User;
  onClose: () => void;
  onCreate: (activity: string, emoji: string, caption: string, duration: number) => void;
}

const CreateInvite: React.FC<CreateInviteProps> = ({ currentUser, onClose, onCreate }) => {
  const [selectedPreset, setSelectedPreset] = useState<ActivityPreset | null>(null);
  const [customActivity, setCustomActivity] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[1].value); // Default 1h
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePresetSelect = async (preset: ActivityPreset) => {
    setSelectedPreset(preset);
    setCustomActivity('');
    setCaption(preset.defaultCaption);
    
    // Opt-in for AI enhancement automatically when selecting preset? 
    // Let's keep it manual or automatic. Let's do automatic small delay fetch to show off AI.
    setIsGenerating(true);
    try {
      const aiCaption = await generateInviteCaption(preset.label);
      setCaption(aiCaption);
    } catch (e) {
      // keep default
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomActivity(e.target.value);
    setSelectedPreset(null);
  };

  const handleGenerateCaption = async () => {
    const activity = customActivity || selectedPreset?.label;
    if (!activity) return;

    setIsGenerating(true);
    try {
      const aiCaption = await generateInviteCaption(activity);
      setCaption(aiCaption);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    const activity = customActivity || selectedPreset?.label || 'Hangout';
    const emoji = selectedPreset?.emoji || '⚡️';
    onCreate(activity, emoji, caption, selectedTime);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-slide-up sm:animate-none">
      <div className="bg-dark-card w-full max-w-md sm:rounded-2xl rounded-t-2xl border border-white/10 p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Invite</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-dark-muted hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Activity Selection */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3 block">What's the move?</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {ACTIVITY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                  selectedPreset?.id === preset.id 
                    ? 'bg-brand-600 border-brand-400 text-white scale-105 shadow-lg shadow-brand-900/50' 
                    : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="text-2xl mb-1">{preset.emoji}</span>
                <span className="text-[10px] font-medium truncate w-full text-center">{preset.label}</span>
              </button>
            ))}
          </div>
          
          <input
            type="text"
            placeholder="Or type custom activity..."
            value={customActivity}
            onChange={handleCustomType}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white placeholder-dark-muted focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none transition"
          />
        </div>

        {/* Caption Generator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider">The Hype</label>
            <button 
              onClick={handleGenerateCaption}
              disabled={isGenerating || (!customActivity && !selectedPreset)}
              className="text-xs flex items-center gap-1 text-brand-400 hover:text-brand-300 disabled:opacity-50 transition"
            >
              <Sparkles size={12} />
              {isGenerating ? 'Generating...' : 'AI Rewrite'}
            </button>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-400 outline-none h-20 resize-none"
          />
        </div>

        {/* Time Picker */}
        <div className="mb-8">
          <label className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3 block">When?</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {TIME_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelectedTime(opt.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                  selectedTime === opt.value
                    ? 'bg-brand-600 border-brand-400 text-white shadow-lg shadow-brand-900/50'
                    : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Clock size={14} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={handleSubmit}
          disabled={!caption}
          className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-brand-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition transform active:scale-95"
        >
          <Send size={20} />
          Send Invite
        </button>

      </div>
    </div>
  );
};

export default CreateInvite;