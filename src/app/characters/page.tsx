'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCharacter } from '@/lib/characters';
import Link from 'next/link';

// Helper to get border color based on character name
function getBorderColor(name: string): string {
  if (name === 'Kenji') return 'glow-border-cyan';
  if (name === 'Sakura') return 'glow-border-rose';
  return 'glow-border';
}

export default function CharactersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen-dark flex items-center justify-center text-text p-4">
        Loading...
      </div>
    );
  }

  // Safe fallback if getCharacter returns undefined
  const characters: any[] = (getCharacter('international') as unknown as any[]) || [];

  return (
    <>
      {/* Compact Top Bar (Already in layout) */}
      <main className="flex-1 relative p-3 md:p-6 overflow-y-auto surface-dark">
        {/* Compact Banner */}
        <div className="max-w-6xl mx-auto mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] drop-shadow-[0_0_10px_rgba(248,250,252,0.5)] mb-3 md:mb-4">
            Explore Characters
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-[#101014] border border-[#8B5CF6]/30 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] glow-border text-sm md:text-base"
            />
            <div className="flex flex-wrap gap-1 md:gap-2">
              <button className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-full glow-border">Anime</button>
              <button className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full glow-border-cyan">Realistic</button>
              <button className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 rounded-full glow-border-rose">USA</button>
            </div>
          </div>
        </div>

        {/* Character Grid - 2 Columns on Mobile */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {characters.map((char: any, index: number) => {
            const id = char.id || index;
            const name = char.name || 'Character';
            const origin = char.origin || 'International';
            const style = char.style || 'Anime/Realistic';
            const subjects = (char.learningSubjects || []) as string[];
            const borderColor = getBorderColor(name);
            const imageSrc = char.image || '/images/characters/placeholder.png';

            return (
              <Link
                key={index}
                href={`/chat/${id}`}
                className={`relative group block w-full rounded-xl overflow-hidden border transition-all duration-300 ${borderColor}`}
              >
                {/* Portrait Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191923]/90 via-[#191923]/40 to-transparent" />
                
                {/* Character Image */}
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-32 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Character Info (Compact Mobile) */}
                <div className="p-2 md:p-5 relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-[#F8FAFC] mb-1 md:mb-2 drop-shadow-[0_0_8px_rgba(248,250,252,0.5)] truncate">
                    {name}
                  </h3>
                  <p className="text-[10px] md:text-sm text-[#F8FAFC]/80 mb-1 md:mb-3 truncate">
                    {origin} • {style}
                  </p>
                  
                  {/* Learning Subjects (Compact Badges) */}
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                    {subjects.slice(0, 3).map((subject: string, i: number) => (
                      <span key={i} className={`text-[8px] md:text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-1 md:px-3 py-0.5 md:py-1 rounded-full border border-[#8B5CF6]/30 ${borderColor}`}>
                        {subject}
                      </span>
                    ))}
                    {subjects.length > 3 && (
                      <span className={`text-[8px] md:text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-1 md:px-3 py-0.5 md:py-1 rounded-full border border-[#06B6D4]/30 ${borderColor}`}>
                        + {subjects.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/chat/${id}`} className="w-full block text-center bg-gradient-to-r from-[#8B5CF6]/20 via-[#06B6D4]/20 to-[#EC4899]/20 text-[#F8FAFC] py-2 md:py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#8B5CF6]/40 hover:via-[#06B6D4]/40 hover:to-[#EC4899]/40 transition-colors font-semibold border border-[#8B5CF6]/30 glow-border text-xs md:text-base">
                    Start
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
