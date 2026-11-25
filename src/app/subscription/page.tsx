'use client'

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primaryAccent mb-8">Future Premium Plans</h1>
      <div className="bg-secondary p-8 rounded-2xl border border-secondaryAccent/30 mb-8">
        <h2 className="text-2xl font-bold text-secondaryAccent mb-4">Coming Soon</h2>
        <p className="text-text/80 mb-6">
          Premium subscription will offer extended memory, additional daily messages, and premium characters.
        </p>
        <p className="text-text/80">
          India-first payment integration (Razorpay) will be available soon.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary/50 p-6 rounded-xl border border-secondaryAccent/20">
          <h3 className="text-xl font-bold text-primaryAccent mb-3">Free Plan</h3>
          <ul className="space-y-2 text-text/80 text-sm">
            <li>✓ 25 messages per day (IST)</li>
            <li>✓ All 4 initial characters</li>
            <li>✓ Stealth learning engine</li>
            <li>✓ Immersive chat UI</li>
          </ul>
        </div>
        <div className="bg-secondary/50 p-6 rounded-xl border border-secondaryAccent/20 opacity-60">
          <h3 className="text-xl font-bold text-primaryAccent mb-3">Premium Plan (Coming Soon)</h3>
          <ul className="space-y-2 text-text/80 text-sm">
            <li>✓ Unlimited messages</li>
            <li>✓ Extended memory</li>
            <li>✓ Premium characters</li>
            <li>✓ Advanced scenarios</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
