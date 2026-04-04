import { useState, useMemo } from "react";
import { Briefcase, MapPin, Search, Users } from "lucide-react";
import { DemoSection } from "@/showcase/component-page";
import {
  FilterButton,
  ActiveFilters,
  type ActiveFilter,
  type FilterField,
} from "@/components/ui/filter-bar";
import { Input } from "@/components/ui/input";

const fields: FilterField[] = [
  {
    type: "option",
    key: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "on-leave", label: "On Leave" },
      { value: "probation", label: "Probation" },
    ],
  },
  {
    type: "option",
    key: "department",
    label: "Department",
    icon: Users,
    options: [
      { value: "engineering", label: "Engineering" },
      { value: "design", label: "Design" },
      { value: "marketing", label: "Marketing" },
      { value: "hr", label: "Human Resources" },
      { value: "finance", label: "Finance" },
      { value: "operations", label: "Operations" },
    ],
  },
  {
    type: "option",
    key: "banned",
    label: "Banned",
    multiple: false,
    options: [
      { value: "true", label: "True" },
      { value: "false", label: "False" },
    ],
  },
  {
    type: "option",
    key: "role",
    label: "Role",
    icon: Briefcase,
    multiple: false,
    options: [
      { value: "manager", label: "Manager" },
      { value: "senior", label: "Senior" },
      { value: "mid", label: "Mid-Level" },
      { value: "junior", label: "Junior" },
      { value: "intern", label: "Intern" },
    ],
  },
  {
    type: "option",
    key: "location",
    label: "Location",
    icon: MapPin,
    options: [
      { value: "kl", label: "Kuala Lumpur" },
      { value: "penang", label: "Penang" },
      { value: "jb", label: "Johor Bahru" },
      { value: "remote", label: "Remote" },
    ],
  },
  {
    type: "date-range",
    key: "created",
    label: "Created",
  },
  {
    type: "date",
    key: "lastSignedIn",
    label: "Last signed in",
  },
  {
    type: "text",
    key: "name",
    label: "Name",
    placeholder: "Search by name...",
  },
  {
    type: "text",
    key: "email",
    label: "Email",
    placeholder: "Search by email...",
  },
];

export default function FilterBarDemo() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const activeKeys = useMemo(() => new Set(filters.map((f) => f.key)), [filters]);

  const handleAdd = (key: string) => {
    setFilters((prev) => [...prev, { key, type: "pending" }]);
  };

  const [presetFilters, setPresetFilters] = useState<ActiveFilter[]>([
    { key: "created", type: "date-range", operator: "between", start: new Date(2026, 2, 4), end: new Date(2026, 2, 13) },
    { key: "banned", type: "option", operator: "is", values: ["true"] },
  ]);
  const presetActiveKeys = useMemo(() => new Set(presetFilters.map((f) => f.key)), [presetFilters]);

  const handlePresetAdd = (key: string) => {
    setPresetFilters((prev) => [...prev, { key, type: "pending" }]);
  };

  return (
    <>
      <DemoSection title="Default" code={`import { useState, useMemo } from "react"
import {
  FilterButton,
  ActiveFilters,
  type ActiveFilter,
  type FilterField,
} from "@/components/ui/filter-bar"

const fields: FilterField[] = [
  {
    type: "option",
    key: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
]

const [filters, setFilters] = useState<ActiveFilter[]>([])
const activeKeys = useMemo(() => new Set(filters.map((f) => f.key)), [filters])

<FilterButton
  fields={fields}
  activeKeys={activeKeys}
  onAdd={(key) => setFilters((prev) => [...prev, { key, type: "pending" }])}
/>
<ActiveFilters fields={fields} filters={filters} onChange={setFilters} />`}>
        <div className="w-full space-y-3">
          <p className="text-sm text-muted-foreground">
            Click the filter icon to select a field. Active filters appear as
            segmented chips below with operator and value controls.
          </p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <FilterButton
              fields={fields}
              activeKeys={activeKeys}
              onAdd={handleAdd}
            />
          </div>
          <ActiveFilters
            fields={fields}
            filters={filters}
            onChange={setFilters}
          />
          {filters.length > 0 && (
            <pre className="mt-3 rounded-md bg-muted p-3 text-xs">
              {JSON.stringify(filters, null, 2)}
            </pre>
          )}
        </div>
      </DemoSection>

      <DemoSection title="With Pre-set Filters">
        <div className="w-full space-y-3">
          <p className="text-sm text-muted-foreground">
            Filters can be initialized with values including operators.
            Matches the reference design with date range and boolean filters.
          </p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9"
                readOnly
              />
            </div>
            <FilterButton
              fields={fields}
              activeKeys={presetActiveKeys}
              onAdd={handlePresetAdd}
            />
          </div>
          <ActiveFilters
            fields={fields}
            filters={presetFilters}
            onChange={setPresetFilters}
          />
          <pre className="mt-3 rounded-md bg-muted p-3 text-xs">
            {JSON.stringify(presetFilters, null, 2)}
          </pre>
        </div>
      </DemoSection>
    </>
  );
}
