import type {
  BudgetRange,
  LifestyleTag,
  PropertyFilter,
  PropertyType,
} from "../types/property";
import { LIFESTYLE_LABELS } from "../types/property";

interface FilterBarProps {
  filter: PropertyFilter;
  onChange: (filter: PropertyFilter) => void;
}

const BUDGET_OPTIONS: { label: string; value: BudgetRange | "" }[] = [
  { label: "All Budgets", value: "" },
  { label: "Under ₹30L", value: "Under30L" },
  { label: "₹30L – ₹50L", value: "ThirtyTo50L" },
  { label: "₹50L – ₹80L", value: "FiftyTo80L" },
  { label: "Above ₹80L", value: "Above80L" },
];

const LOCALITY_OPTIONS = [
  "All Areas",
  "Sama Road",
  "Savli Road",
  "Gotri",
  "Waghodia Road",
];

const LIFESTYLE_OPTIONS: LifestyleTag[] = [
  "FamilyFriendly",
  "NearSchools",
  "InvestmentReady",
  "ReadyToMove",
  "LuxuryAmenities",
];

const TYPE_OPTIONS: { label: string; value: PropertyType | "" }[] = [
  { label: "All Types", value: "" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Plot", value: "Plot" },
  { label: "Commercial", value: "Commercial" },
];

function isFilterActive(filter: PropertyFilter): boolean {
  return !!(
    filter.budgetRange ||
    (filter.locality && filter.locality !== "") ||
    (filter.tags && filter.tags.length > 0) ||
    filter.propertyType
  );
}

export function FilterBar({ filter, onChange }: FilterBarProps) {
  const handleBudget = (value: BudgetRange | "") => {
    onChange({ ...filter, budgetRange: value === "" ? undefined : value });
  };

  const handleLocality = (locality: string) => {
    const val = locality === "All Areas" ? "" : locality;
    onChange({ ...filter, locality: val });
  };

  const handleTag = (tag: LifestyleTag) => {
    const current = filter.tags ?? [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onChange({ ...filter, tags: next.length > 0 ? next : undefined });
  };

  const handleType = (value: PropertyType | "") => {
    onChange({ ...filter, propertyType: value === "" ? undefined : value });
  };

  const clearFilters = () => {
    onChange({ searchQuery: filter.searchQuery });
  };

  const activeLocality = filter.locality ?? "";

  return (
    <div
      className="sticky top-16 z-20 bg-card border-b border-border"
      style={{ boxShadow: "0 2px 8px rgba(26,39,68,0.06)" }}
      data-ocid="filter.bar"
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-start gap-0 min-w-max px-4 py-2.5 divide-x divide-border">
          {/* Budget */}
          <div className="flex items-center gap-1.5 pr-4">
            {BUDGET_OPTIONS.map((opt) => {
              const isActive = (filter.budgetRange ?? "") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleBudget(opt.value as BudgetRange | "")}
                  className="px-3 py-1 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200 border"
                  style={
                    isActive
                      ? {
                          backgroundColor: "#1a2744",
                          color: "#fff",
                          borderColor: "#1a2744",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#1a2744",
                          borderColor: "#1a2744",
                        }
                  }
                  data-ocid={`filter.budget.${opt.value || "all"}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Locality */}
          <div className="flex items-center gap-1.5 px-4">
            {LOCALITY_OPTIONS.map((loc) => {
              const isActive =
                loc === "All Areas"
                  ? activeLocality === ""
                  : activeLocality
                      .toLowerCase()
                      .includes(loc.toLowerCase().split(" ")[0]);
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocality(loc)}
                  className="px-3 py-1 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200 border"
                  style={
                    isActive
                      ? {
                          backgroundColor: "#c0392b",
                          color: "#fff",
                          borderColor: "#c0392b",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#1a2744",
                          borderColor: "#1a2744",
                        }
                  }
                  data-ocid={`filter.locality.${loc.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          {/* Lifestyle tags */}
          <div className="flex items-center gap-1.5 px-4">
            {LIFESTYLE_OPTIONS.map((tag) => {
              const isActive = (filter.tags ?? []).includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTag(tag)}
                  className="px-3 py-1 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200 border"
                  style={
                    isActive
                      ? {
                          backgroundColor: "#d4a017",
                          color: "#1a2744",
                          borderColor: "#d4a017",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#1a2744",
                          borderColor: "#1a2744",
                        }
                  }
                  data-ocid={`filter.tag.${tag.toLowerCase()}`}
                >
                  {LIFESTYLE_LABELS[tag]}
                </button>
              );
            })}
          </div>

          {/* Property type */}
          <div className="flex items-center gap-1.5 pl-4">
            {TYPE_OPTIONS.map((opt) => {
              const isActive = (filter.propertyType ?? "") === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleType(opt.value as PropertyType | "")}
                  className="px-3 py-1 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200 border"
                  style={
                    isActive
                      ? {
                          backgroundColor: "#1a2744",
                          color: "#fff",
                          borderColor: "#1a2744",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#1a2744",
                          borderColor: "#1a2744",
                        }
                  }
                  data-ocid={`filter.type.${opt.value || "all"}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Clear filters */}
          {isFilterActive(filter) && (
            <div className="flex items-center pl-4">
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-1 rounded-full text-xs font-semibold font-body whitespace-nowrap transition-colors duration-200"
                style={{ color: "#c0392b" }}
                data-ocid="filter.clear_button"
              >
                ✕ Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
