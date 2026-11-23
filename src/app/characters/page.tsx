import { CHARACTERS } from '@/types/characters'

export default function CharactersPage() {
  return (
    <main className="min-h-screen bg-background text-text p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryAccent mb-4">
            Meet Your Companions
          </h1>
          <p className="text-xl text-text/80">
            Select a character to begin your immersive journey.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CHARACTERS.map((char) => (
            <div key={char.id} className="bg-secondary rounded-2xl overflow-hidden border border-secondaryAccent/30 hover:border-primaryAccent/50 transition-all group">
              <div className="h-72 relative overflow-hidden">
                <img 
                  src={char.portraitPath} 
                  alt={char.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h2 className="text-2xl font-bold text-primaryAccent mb-1">{char.name}</h2>
                  <p className="text-sm text-secondaryAccent">{char.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/80 mb-4 line-clamp-3">
                  {char.background}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {char.learningSubjects.slice(0, 3).map((subject, i) => (
                    <span key={i} className="text-xs bg-primaryAccent/10 text-primaryAccent px-3 py-1 rounded-full">
                      {subject}
                    </span>
                  ))}
                  {char.learningSubjects.length > 3 && (
                    <span className="text-xs bg-secondaryAccent/10 text-secondaryAccent px-3 py-1 rounded-full">
                      + {char.learningSubjects.length - 3} more
                    </span>
                  )}
                </div>
                <button className="w-full block text-center bg-secondaryAccent/10 text-secondaryAccent py-3 rounded-xl hover:bg-secondaryAccent/20 transition-colors font-semibold">
                  Start Conversation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
