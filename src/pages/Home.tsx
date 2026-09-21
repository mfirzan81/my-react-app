export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Welcome to My React App</h1>
      <p className="text-gray-600 mb-6">
        This is built with React + Vite + TypeScript + Tailwind CSS.
      </p>
      <ul className="space-y-2">
        {[
          'No page reloads — React updates only what changes',
          'UI is broken into reusable components',
          'State is managed with useState hook',
          'Styled with Tailwind CSS utility classes',
        ].map(item => (
          <li key={item} className="flex items-center gap-2 text-gray-700">
            <span className="text-green-500 font-bold">✓</span> {item}
          </li>
        ))}
      </ul>
    </main>
  )
}
