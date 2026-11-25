'use client'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primaryAccent mb-8">Preferences & Controls</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-secondaryAccent mb-4">Interface</h2>
          <div className="bg-secondary p-6 rounded-2xl border border-secondaryAccent/30">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text/80">Theme</span>
              <select className="bg-background border border-secondaryAccent/30 rounded-xl px-3 py-2 text-text">
                <option>Dark (Default)</option>
                <option>Light</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text/80">Language</span>
              <select className="bg-background border border-secondaryAccent/30 rounded-xl px-3 py-2 text-text">
                <option>English (Initial)</option>
                <option>Hindi (Coming Soon)</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondaryAccent mb-4">Notifications</h2>
          <div className="bg-secondary p-6 rounded-2xl border border-secondaryAccent/30 flex justify-between items-center">
            <span className="text-text/80">Enable conversation alerts</span>
            <input type="checkbox" className="w-5 h-5 accent-primaryAccent" defaultChecked />
          </div>
        </section>
      </div>
    </div>
  )
}
