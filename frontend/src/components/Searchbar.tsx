import { FormEvent, useState } from "react";

interface PropsType {
  onSearch: (a: string) => void;
}

const Searchbar = ({ onSearch }: PropsType) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  return (
    <div className="mt-6 mb-2">
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center"
      >
        <div className="relative">
          <input
            type="text"
            className="min-w-96 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-none focus:ring-0 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out"
            placeholder="Search with keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="dark:bg-white dark:text-slate-800 bg-slate-700 text-white rounded-3xl p-2 absolute right-2 top-1/2 transform -translate-y-1/2 hover:opacity-80 hover:-translate-y-5 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
