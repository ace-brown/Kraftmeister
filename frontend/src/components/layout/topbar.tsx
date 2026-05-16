export function Topbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4">
      <div>
        <h2 className="font-semibold text-lg text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Avatarz */}
        <div className="h-9 w-9 rounded-full bg-zinc-700" />
      </div>
    </header>
  );
}
