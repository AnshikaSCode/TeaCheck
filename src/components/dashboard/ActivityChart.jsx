import { BarChart3 } from "lucide-react";

export default function ActivityChart({ history = [] }) {
  const days = [
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 0 },
  ];

  const now = new Date();

  history.forEach((item) => {
    const date = new Date(item.lastChecked);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0 || diffDays > 6) {
      return;
    }

    const dayIndex = (now.getDay() - diffDays + 6) % 7;

    days[dayIndex].value += 1;
  });

  const maxValue = Math.max(
    ...days.map((day) => day.value),
    1
  );

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#101813] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8c686]">
            Activity
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#f5f3ea]">
            Your checking rhythm
          </h2>

          <p className="mt-1 text-xs text-[#687268]">
            Claims checked over the last 7 days.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a8c686]/10 text-[#a8c686]">
          <BarChart3 size={17} strokeWidth={1.7} />
        </div>
      </div>

      <div className="mt-8 flex h-48 items-end justify-between gap-2 border-b border-white/[0.06] px-1">
        {days.map((day) => {
          const height =
            day.value === 0
              ? 8
              : Math.max((day.value / maxValue) * 100, 14);

          return (
            <div
              key={day.label}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >
              <div className="flex h-full w-full items-end justify-center">
                <div
                  className="w-full max-w-10 rounded-t-lg bg-[#a8c686]/70 transition-all duration-300"
                  style={{
                    height: `${height}%`,
                  }}
                  title={`${day.value} ${
                    day.value === 1 ? "check" : "checks"
                  }`}
                />
              </div>

              <span className="pb-2 text-[10px] text-[#505850]">
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-[#505850]">
        <span>
          {history.length} total{" "}
          {history.length === 1 ? "check" : "checks"}
        </span>

        <span>Last 7 days</span>
      </div>
    </section>
  );
}