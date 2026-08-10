import { BatteryCharging, Fuel, KeyRound, MapPin, Route, Truck } from 'lucide-react'

const help = [
  ['Tow truck', Truck],
  ['Battery jump', BatteryCharging],
  ['Fuel delivery', Fuel],
  ['Lockout', KeyRound],
]

export default function RoadsidePage() {
  return (
    <main className="bg-[#070908] text-white">
      {/* Hero */}
      <section className="w-full border-b border-white/8">
        <div className="w-full px-4 py-14 sm:px-6 lg:px-8 xl:px-12">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#2ee52b]">24/7 Roadside Assistance</p>
          <h1 className="mt-3 text-[clamp(36px,5vw,64px)] font-black leading-[.92] tracking-tight">Help is on the way.</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/55">
            Tell us where you are and what happened. We'll connect you with the nearest available provider.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-14 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Map placeholder */}
          <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_55%_45%,rgba(46,229,43,.12),transparent_35%)]">
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <MapPin size={14} className="text-[#2ee52b]" /> Live location
            </div>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#2ee52b]/25">
              <div className="absolute h-48 w-48 rounded-full border border-[#2ee52b]/12" />
              <div className="absolute h-64 w-64 rounded-full border border-[#2ee52b]/6" />
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2ee52b] text-black">
                <Route size={22} />
              </span>
            </div>
            <p className="text-[13px] font-semibold text-white/60">Your location detected</p>
          </div>

          {/* Request form */}
          <div className="rounded-[8px] border border-white/10 bg-[#0b0d0c] p-7">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#2ee52b]">What do you need?</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {help.map(([name, Icon]) => (
                <button
                  key={name}
                  className="cursor-pointer rounded-[6px] border border-white/10 p-5 text-left transition hover:border-[#2ee52b]/50 hover:bg-[#2ee52b]/5"
                >
                  <Icon className="text-[#2ee52b]" size={20} />
                  <p className="mt-4 text-[13px] font-black">{name}</p>
                </button>
              ))}
            </div>
            <button className="mt-5 w-full cursor-pointer rounded-[5px] bg-[#2ee52b] py-4 text-[13px] font-bold text-black transition hover:bg-[#50f14d]">
              Request assistance
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
