import { Label } from "@/components/ui/label"; // Assumed Shadcn UI
import { Checkbox } from "@/components/ui/checkbox"; // Assumed Shadcn UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assumed Shadcn UI
import { MALAYSIAN_STATES, ROOM_TYPES } from "@/lib/consts";
import { Input } from "@/components/ui/input";

interface FilterProps {
  // We pass the parsed Zod object (SearchParams) here
  values: {
    ownerName?: string;
    city?: string;
    state?: string;
    minRent?: number;
    maxRent?: number;
    roomTypes?: string[];
  };
  // Universal update handler
  onUpdate: (key: string, value: string | number | string[] | null) => void;
}

export function PropertyFilters({ values, onUpdate }: FilterProps) {
  // Handle multi-select logic for Room Types
  const handleRoomTypeToggle = (type: string, isChecked: boolean) => {
    const current = values.roomTypes || [];
    const updated = isChecked
      ? [...current, type]
      : current.filter((t) => t !== type);

    // Pass empty array as null to remove the param entirely
    onUpdate("roomTypes", updated.length > 0 ? updated : null);
  };

  return (
    <div className="space-y-6 border-r pr-6 w-full md:w-64 shrink-0">
      {/* State Filter */}
      <div className="space-y-2">
        <Label>State</Label>
        <Select
          value={values.state || "ALL"}
          onValueChange={(val) => onUpdate("state", val === "ALL" ? null : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All States</SelectItem>
            {MALAYSIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <Label>City</Label>
        <Input
          placeholder="e.g. Cyberjaya"
          defaultValue={values.city}
          // Debounce handled by parent or useDebouncedCallback here
          onChange={(e) => onUpdate("city", e.target.value || null)}
        />
      </div>

      {/* Rent Range */}
      <div className="space-y-2">
        <Label>Rent (RM)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            defaultValue={values.minRent}
            onChange={(e) => onUpdate("minRent", e.target.value || null)}
          />
          <Input
            type="number"
            placeholder="Max"
            defaultValue={values.maxRent}
            onChange={(e) => onUpdate("maxRent", e.target.value || null)}
          />
        </div>
      </div>

      {/* Room Types (Multi-select) */}
      <div className="space-y-3">
        <Label>Room Types</Label>
        <div className="space-y-2">
          {ROOM_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`rt-${type}`}
                checked={values.roomTypes?.includes(type)}
                onCheckedChange={(checked) =>
                  handleRoomTypeToggle(type, checked as boolean)
                }
              />
              <label
                htmlFor={`rt-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Name */}
      <div className="space-y-2">
        <Label>Owner Name</Label>
        <Input
          placeholder="Search owner..."
          defaultValue={values.ownerName}
          onChange={(e) => onUpdate("ownerName", e.target.value || null)}
        />
      </div>
    </div>
  );
}
