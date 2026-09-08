export default function EvidenceSummary({
  checkedSources,
  supportingSources,
  contradictingSources,
  neutralSources,
}) {
  const stats = [
    {
      label: "Sources checked",
      value: checkedSources,
      color: "#a8c686",
    },
    {
      label: "Supporting",
      value: supportingSources,
      color: "#7bcb9b",
    },
    {
      label: "Contradicting",
      value: contradictingSources,
      color: "#ff7a72",
    },
    {
      label: "Neutral",
      value: neutralSources,
      color: "#e8c66a",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-2xl
            border border-white/[0.07]
            bg-[#101813]
            p-5
          "
        >
          <p className="text-[10px] uppercase tracking-wider text-[#596159]">
            {stat.label}
          </p>

          <p
            className="mt-3 text-2xl font-semibold"
            style={{ color: stat.color }}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}