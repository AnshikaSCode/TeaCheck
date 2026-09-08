import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  description,
  icon: Icon,
  trend,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#101813] p-5 transition-all hover:border-[#a8c686]/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8c686]/10 text-[#a8c686]">
          {Icon && <Icon size={18} strokeWidth={1.7} />}
        </div>

        {trend && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#a8c686]">
            {trend}
            <ArrowUpRight size={12} strokeWidth={1.7} />
          </span>
        )}
      </div>

      <div className="mt-6">
        <p className="text-3xl font-semibold tracking-tight text-[#f5f3ea]">
          {value}
        </p>

        <p className="mt-1 text-sm font-medium text-[#b7beb6]">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-[11px] leading-5 text-[#505850]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}