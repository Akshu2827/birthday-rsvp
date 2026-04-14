import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Music, Utensils, Heart, Loader2 } from 'lucide-react';

const App = () => {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', happiness: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const invitationData = {
    date: "16 April 2026",
    day: "Thursday",
    time: "6:00 PM Onwards",
    location: "D-304, Heritage Max, Sector 102, Dwarka Expressway, Gurgaon",
    theme: "Chill & Shine",
    dressCode: "Just feel awesome"
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your name!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save RSVP');
      }

      setIsRSVPed(true);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans selection:bg-rose-100">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div 
        className={`max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-rose-200/50 overflow-hidden relative transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header/Hero Section */}
        <div className="relative h-64 bg-gradient-to-br from-rose-400 to-orange-300 flex flex-col items-center justify-center text-white p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4"><Sparkles size={24} /></div>
            <div className="absolute bottom-8 right-12"><Sparkles size={32} /></div>
            <div className="absolute top-1/2 left-1/4 animate-pulse"><Sparkles size={16} /></div>
          </div>
          
          <div className="z-10 text-center">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              You're Lovingly Invited
            </span>
            <h1 className="text-5xl font-serif italic mb-2">Birthday Bash</h1>
            <p className="text-rose-50 font-medium">Celebrating a wonderful year!</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8 relative">
          <div className="text-center">
            <p className="text-neutral-600 leading-relaxed italic">
              "Hey Besties! 🎂 Birthdays are special because of YOU, and I’d love to celebrate mine with all my favourite people around! 🥰"
            </p>
          </div>

          {/* Details Grid */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50 transition-colors hover:bg-rose-50">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Calendar className="text-rose-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase font-bold tracking-tighter">When</p>
                <p className="text-neutral-800 font-semibold">{invitationData.date} ({invitationData.day})</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 transition-colors hover:bg-amber-50">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Clock className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase font-bold tracking-tighter">Time</p>
                <p className="text-neutral-800 font-semibold">{invitationData.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 transition-colors hover:bg-neutral-100/50">
              <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                <MapPin className="text-neutral-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase font-bold tracking-tighter">Where</p>
                <p className="text-neutral-800 font-semibold text-sm leading-tight">
                  {invitationData.location}
                </p>
              </div>
            </div>
          </div>

          {/* Theme & Dress Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border-2 border-dashed border-rose-200 text-center">
              <p className="text-[10px] text-rose-400 uppercase font-bold mb-1">Theme</p>
              <p className="text-rose-600 font-serif font-bold italic">“{invitationData.theme}”</p>
            </div>
            <div className="p-4 rounded-2xl border-2 border-dashed border-amber-200 text-center">
              <p className="text-[10px] text-amber-500 uppercase font-bold mb-1">Dress Code</p>
              <p className="text-amber-700 font-medium text-sm">‘{invitationData.dressCode}’</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-neutral-900 rounded-3xl p-6 text-white">
            <h3 className="text-center font-serif italic text-xl mb-4 text-rose-300">What we'll do...</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <Utensils size={16} className="text-rose-400" />
                <span className="text-sm text-neutral-300">Delicious food & cake cutting 🍰</span>
              </div>
              <div className="flex items-center gap-3">
                <Music size={16} className="text-rose-400" />
                <span className="text-sm text-neutral-300">Fun games, music, and dancing 🎶</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart size={16} className="text-rose-400" />
                <span className="text-sm text-neutral-300">Lots of laughs and candid moments!</span>
              </div>
            </div>
          </div>

          {/* RSVP Section */}
          <div className="text-center pt-4">
            {!showForm && !isRSVPed && (
              <>
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 shadow-lg shadow-rose-200"
                >
                  Count Me In! 🥰
                </button>
                <p className="text-neutral-400 text-xs mt-4">
                  Kindly RSVP so we can plan better. 🙌
                </p>
              </>
            )}

            {showForm && !isRSVPed && (
              <form onSubmit={handleRSVPSubmit} className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 text-left space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-rose-800 font-bold text-center mb-2">Just a few details! 🎉</h4>
                
                <div>
                  <label className="block text-sm font-semibold text-rose-900 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="E.g. Sarah Smith"
                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-rose-900 mb-1">
                    Excitement Level (1-10) 🔥: {formData.happiness}
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={formData.happiness}
                    onChange={e => setFormData({...formData, happiness: e.target.value})}
                    className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-xs text-rose-400 mt-1">
                    <span>Chill</span>
                    <span>Ready to Party!</span>
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                <div className="flex gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-white border border-rose-200 text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Submit 🎈"}
                  </button>
                </div>
              </form>
            )}

            {isRSVPed && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-700 font-medium flex items-center justify-center gap-2 animate-bounce">
                Yay! See you there! 💖 🍰
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
