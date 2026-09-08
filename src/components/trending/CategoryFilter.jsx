const categories = [
  "All",
  "Politics",
  "Technology",
  "Health",
  "Science",
  "Entertainment",
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
              isActive
                ? "border-[#a8c686]/30 bg-[#a8c686]/10 text-[#a8c686]"
                : "border-white/[0.07] bg-[#101813] text-[#687268] hover:border-white/[0.12] hover:text-[#b7beb6]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}