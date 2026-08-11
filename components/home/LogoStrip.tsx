export default function LogoStrip() {
  return (
    <section className="border-y border-ink/10 bg-sand py-7">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="text-center text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink/40 mb-5">
          Built for teams who answer the phone for a living
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-11 w-full opacity-80 border-2 border-dashed border-ink/15 rounded-md flex items-center justify-center text-[11px] font-medium text-ink/35"
            >
              Client logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
