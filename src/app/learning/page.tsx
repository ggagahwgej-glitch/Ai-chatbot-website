'use client'

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primaryAccent mb-8">Stealth Learning Discoveries</h1>
      <p className="text-text/80 mb-8">Track your vocabulary and knowledge growth naturally discovered during conversations.</p>
      
      <div className="space-y-4">
        {/* Mock Learning Items */}
        {[
          { word: 'Resilience', meaning: 'Ability to recover after difficulties', subject: 'English Vocabulary', date: 'Nov 23, 2026' },
          { word: 'Entrepreneurship', meaning: 'Process of designing and running a business', subject: 'Business', date: 'Nov 22, 2026' },
          { word: 'Probability', meaning: 'Likelihood of an event occurring', subject: 'Logical Reasoning', date: 'Nov 21, 2026' }
        ].map((item, i) => (
          <div key={i} className="bg-secondary p-6 rounded-2xl border border-secondaryAccent/30">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-primaryAccent">{item.word}</h3>
              <span className="text-xs bg-secondaryAccent/10 text-secondaryAccent px-3 py-1 rounded-full">{item.subject}</span>
            </div>
            <p className="text-text/80 mb-2"><strong>Meaning:</strong> {item.meaning}</p>
            <p className="text-text/60 text-sm italic">Discovered on {item.date} during conversation with character.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
