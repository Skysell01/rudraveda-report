import React, { useEffect, useState } from 'react';
import { User, Calendar, Clock, MapPin, Globe, Mail, Phone, Sparkles } from 'lucide-react';
import { fetchLocations } from '../api/client';
import { CustomerFormData, LocationInput } from '../types';

interface CustomerFormProps {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  errors: Record<string, string>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  setFormData,
  errors
}) => {
  const [query, setQuery] = useState(formData.birthPlace);
  const [suggestions, setSuggestions] = useState<LocationInput[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounced geocoding location search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query.trim().length >= 2 && query !== formData.birthPlace) {
        fetchLocations(query).then(results => {
          setSuggestions(results);
          setShowDropdown(true);
        }).catch(() => {});
      } else if (!query) {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query, formData.birthPlace]);

  const selectLocation = (loc: LocationInput) => {
    // Extract country if present in location name (e.g. "New Delhi, India" -> "India")
    const parts = loc.name.split(',');
    const guessedCountry = parts.length > 1 ? parts[parts.length - 1].trim() : formData.country || 'India';

    setFormData(prev => ({
      ...prev,
      birthPlace: loc.name,
      country: guessedCountry,
      location: loc
    }));
    setQuery(loc.name);
    setShowDropdown(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border-gold-500/30 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-cosmic-700/80">
        <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-slate-100">Customer Birth Details</h3>
          <p className="text-xs text-slate-400">Enter primary customer information for Vedic calculations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            First Name <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="e.g. Vikram"
              className={`w-full bg-cosmic-900/90 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                errors.firstName ? 'border-red-500/80 bg-red-500/5' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.firstName && <p className="mt-1 text-[11px] text-red-400">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="e.g. Sharma"
              className={`w-full bg-cosmic-900/90 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                errors.lastName ? 'border-red-500/80 bg-red-500/5' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.lastName && <p className="mt-1 text-[11px] text-red-400">{errors.lastName}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Gender <span className="text-gold-400">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
            className="w-full bg-cosmic-900/90 border border-cosmic-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors cursor-pointer"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Date of Birth <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              required
              value={formData.dob}
              onChange={e => setFormData({ ...formData, dob: e.target.value })}
              className={`w-full bg-cosmic-900/90 border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors [color-scheme:dark] ${
                errors.dob ? 'border-red-500/80' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.dob && <p className="mt-1 text-[11px] text-red-400">{errors.dob}</p>}
        </div>

        {/* Time of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Time of Birth <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <input
              type="time"
              required
              value={formData.tob}
              onChange={e => setFormData({ ...formData, tob: e.target.value })}
              className={`w-full bg-cosmic-900/90 border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors [color-scheme:dark] ${
                errors.tob ? 'border-red-500/80' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.tob && <p className="mt-1 text-[11px] text-red-400">{errors.tob}</p>}
        </div>

        {/* Birth Place (Autocomplete) */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Birth Place <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gold-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              required
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setFormData(prev => ({ ...prev, birthPlace: e.target.value }));
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              placeholder="Search city (e.g. New Delhi, Mumbai)..."
              className={`w-full bg-cosmic-900/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                errors.birthPlace ? 'border-red-500/80' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.birthPlace && <p className="mt-1 text-[11px] text-red-400">{errors.birthPlace}</p>}

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-cosmic-950 border border-cosmic-700 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
              {suggestions.map((loc, idx) => (
                <div
                  key={idx}
                  onClick={() => selectLocation(loc)}
                  className="px-4 py-2.5 text-xs text-slate-200 hover:bg-cosmic-800 hover:text-gold-300 cursor-pointer flex items-center justify-between transition-colors border-b border-cosmic-900 last:border-0"
                >
                  <span className="font-medium">{loc.name}</span>
                  <span className="text-[10px] text-slate-500">{loc.timezone}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Country <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              required
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g. India"
              className={`w-full bg-cosmic-900/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                errors.country ? 'border-red-500/80' : 'border-cosmic-700'
              }`}
            />
          </div>
          {errors.country && <p className="mt-1 text-[11px] text-red-400">{errors.country}</p>}
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Email Address</span>
            <span className="text-[10px] text-slate-500 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. customer@example.com"
              className="w-full bg-cosmic-900/90 border border-cosmic-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
            />
          </div>
        </div>

        {/* Phone (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Phone Number</span>
            <span className="text-[10px] text-slate-500 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-cosmic-900/90 border border-cosmic-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
