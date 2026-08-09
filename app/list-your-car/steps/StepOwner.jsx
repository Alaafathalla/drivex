const cl = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"

export function StepOwner({ data, update }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-[17px] font-bold text-gray-900">Your Contact Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Full Name *</p>
          <input value={data.ownerName} onChange={e => update({ ownerName: e.target.value })}
            placeholder="Your full name" className={cl} />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Email *</p>
          <input type="email" value={data.ownerEmail} onChange={e => update({ ownerEmail: e.target.value })}
            placeholder="you@example.com" className={cl} />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Phone Number *</p>
          <input type="tel" value={data.ownerPhone} onChange={e => update({ ownerPhone: e.target.value })}
            placeholder="+971 50 000 0000" className={cl} />
        </label>
        <label className="block">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-gray-500">Preferred Contact</p>
          <select value={data.preferredContact} onChange={e => update({ preferredContact: e.target.value })} className={cl}>
            <option value="phone">Phone call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-[12px] text-blue-800">
          <strong>Your info is private.</strong> Buyers will only see your name and preferred contact method. Phone and email are hidden until you accept an inquiry.
        </p>
      </div>
    </div>
  )
}
