"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PropertyCard } from "./property-card";
import propertiesData from "@/data/properties.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Property } from "../types";

export default function SearchClient() {
  const availabilityRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);
  const budgetRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [all, setAll] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000");
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // simple state for dropdown selections
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("Any");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    [],
  );

  // basic filter toggles inside Filter dropdown
  const [depositNotRequired, setDepositNotRequired] = useState(false);
  const [billWifi, setBillWifi] = useState(false);
  const [billElectricity, setBillElectricity] = useState(false);
  const [billWater, setBillWater] = useState(false);
  const [billGas, setBillGas] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (!cancelled)
          setAll(
            Array.isArray(propertiesData)
              ? (propertiesData as unknown as Property[])
              : [],
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        availabilityOpen &&
        availabilityRef.current &&
        !availabilityRef.current.contains(target)
      )
        setAvailabilityOpen(false);
      if (typeOpen && typeRef.current && !typeRef.current.contains(target))
        setTypeOpen(false);
      if (
        budgetOpen &&
        budgetRef.current &&
        !budgetRef.current.contains(target)
      )
        setBudgetOpen(false);
      if (
        filterOpen &&
        filterRef.current &&
        !filterRef.current.contains(target)
      )
        setFilterOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [availabilityOpen, typeOpen, budgetOpen, filterOpen]);

  // function closeAll() {
  // 	setAvailabilityOpen(false);
  // 	setTypeOpen(false);
  // 	setBudgetOpen(false);
  // 	setFilterOpen(false);
  // }

  function toggleMenu(which: "availability" | "type" | "budget" | "filter") {
    if (which === "availability") {
      setAvailabilityOpen((prev) => {
        const next = !prev;
        if (next) {
          setTypeOpen(false);
          setBudgetOpen(false);
          setFilterOpen(false);
        }
        return next;
      });
      return;
    }
    if (which === "type") {
      setTypeOpen((prev) => {
        const next = !prev;
        if (next) {
          setAvailabilityOpen(false);
          setBudgetOpen(false);
          setFilterOpen(false);
        }
        return next;
      });
      return;
    }
    if (which === "budget") {
      setBudgetOpen((prev) => {
        const next = !prev;
        if (next) {
          setAvailabilityOpen(false);
          setTypeOpen(false);
          setFilterOpen(false);
        }
        return next;
      });
      return;
    }
    if (which === "filter") {
      setFilterOpen((prev) => {
        const next = !prev;
        if (next) {
          setAvailabilityOpen(false);
          setTypeOpen(false);
          setBudgetOpen(false);
        }
        return next;
      });
    }
  }

  function resetFilters() {
    setQ("");
    setCity("");
    setState("");
    setMinPrice("0");
    setMaxPrice("5000");
    setSelectedAvailability("Any");
    setSelectedPropertyTypes([]);
    setDepositNotRequired(false);
    setBillWifi(false);
    setBillElectricity(false);
    setBillWater(false);
    setBillGas(false);
  }

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.POSITIVE_INFINITY;
    return all
      .filter((p) => {
        const matchesQ =
          !qLower ||
          p.title.toLowerCase().includes(qLower) ||
          p.description.toLowerCase().includes(qLower) ||
          p.address.toLowerCase().includes(qLower) ||
          p.city.toLowerCase().includes(qLower) ||
          p.state.toLowerCase().includes(qLower);
        const matchesCity =
          !city || p.city.toLowerCase().includes(city.toLowerCase());
        const matchesState =
          !state || p.state.toLowerCase().includes(state.toLowerCase());
        const matchesPrice = p.pricePerMonth >= min && p.pricePerMonth <= max;
        const titleLower = p.title.toLowerCase();
        const matchesType =
          selectedPropertyTypes.length === 0 ||
          selectedPropertyTypes.some((t) =>
            titleLower.includes(t.toLowerCase()),
          );
        return (
          matchesQ && matchesCity && matchesState && matchesPrice && matchesType
        );
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [all, q, city, state, minPrice, maxPrice, selectedPropertyTypes]);

  // Build a simple histogram of prices to mimic the visual context in the dropdown
  const bucketSize = 250;
  const numBuckets = Math.ceil(5000 / bucketSize);
  const buckets = new Array(numBuckets).fill(0);
  for (const p of all) {
    const price = Math.max(0, Math.min(5000, p.pricePerMonth));
    const idx = Math.min(numBuckets - 1, Math.floor(price / bucketSize));
    buckets[idx] += 1;
  }
  const maxBucket = buckets.reduce((m, v) => Math.max(m, v), 1);

  return (
    <div>
      {/* Top chips bar */}
      <div className="flex gap-2 flex-wrap items-center mb-3">
        {/* Availability dropdown */}
        <div className="relative" ref={availabilityRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMenu("availability")}
          >
            <span>Availability</span>
            <span
              className={
                availabilityOpen
                  ? "ml-2 -rotate-180 transition-transform"
                  : "ml-2 transition-transform"
              }
            >
              ▾
            </span>
          </Button>
          {availabilityOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                zIndex: 20,
                marginTop: 8,
                padding: 12,
                border: "1px solid #eee",
                background: "#fff",
                borderRadius: 12,
                width: 240,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <label style={{ display: "block", padding: "6px 8px" }}>
                <input
                  type="radio"
                  name="avail"
                  checked={selectedAvailability === "Any"}
                  onChange={() => setSelectedAvailability("Any")}
                />{" "}
                Any
              </label>
              <label style={{ display: "block", padding: "6px 8px" }}>
                <input
                  type="radio"
                  name="avail"
                  checked={selectedAvailability === "Available now"}
                  onChange={() => setSelectedAvailability("Available now")}
                />{" "}
                Available now
              </label>
              <label style={{ display: "block", padding: "6px 8px" }}>
                <input
                  type="radio"
                  name="avail"
                  checked={selectedAvailability === "From next month"}
                  onChange={() => setSelectedAvailability("From next month")}
                />{" "}
                From next month
              </label>
            </div>
          )}
        </div>

        {/* Property Type dropdown */}
        <div className="relative" ref={typeRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMenu("type")}
          >
            <span>Property Type</span>
            <span
              className={
                typeOpen
                  ? "ml-2 -rotate-180 transition-transform"
                  : "ml-2 transition-transform"
              }
            >
              ▾
            </span>
          </Button>
          {typeOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                zIndex: 20,
                marginTop: 8,
                padding: 20,
                border: "1px solid #eee",
                background: "#fff",
                borderRadius: 12,
                width: 420,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <h3 style={{ margin: "0 0 6px" }}>Property type</h3>
              <p style={{ margin: "0 0 12px", color: "#555" }}>
                Select a property type
              </p>
              {(() => {
                const categories = [
                  {
                    key: "apartment",
                    label: "Apartments",
                    matchers: ["apartment"],
                  },
                  { key: "studio", label: "Studios", matchers: ["studio"] },
                  {
                    key: "room",
                    label: "Rooms in shared apartment",
                    matchers: ["room"],
                  },
                  {
                    key: "residence",
                    label: "Student residences",
                    matchers: ["student residence", "dorm"],
                  },
                ];
                const counts = categories.map((cat) => {
                  const c = all.reduce((acc, p) => {
                    const t = p.title.toLowerCase();
                    return (
                      acc + (cat.matchers.some((m) => t.includes(m)) ? 1 : 0)
                    );
                  }, 0);
                  return { ...cat, count: c };
                });
                return (
                  <div style={{ display: "grid", gap: 10 }}>
                    {counts.map((cat) => (
                      <label
                        key={cat.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPropertyTypes.includes(cat.key)}
                          onChange={(e) =>
                            setSelectedPropertyTypes((prev) =>
                              e.target.checked
                                ? [...prev, cat.key]
                                : prev.filter((x) => x !== cat.key),
                            )
                          }
                        />
                        <span style={{ flex: 1 }}>{cat.label}</span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#8a4fb3",
                            background: "#f3e8ff",
                            padding: "2px 8px",
                            borderRadius: 9999,
                          }}
                        >
                          {cat.count}
                        </span>
                      </label>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTypeOpen(false)}
                      style={{
                        marginTop: 8,
                        width: "100%",
                        background: "#0b6bcb",
                        borderRadius: 10,
                        padding: "10px 12px",
                      }}
                    >
                      View {filtered.length} results
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Budget dropdown */}
        <div className="relative" ref={budgetRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMenu("budget")}
          >
            <span>Budget</span>
            <span
              className={
                budgetOpen
                  ? "ml-2 -rotate-180 transition-transform"
                  : "ml-2 transition-transform"
              }
            >
              ▾
            </span>
          </Button>
          {budgetOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                zIndex: 20,
                marginTop: 8,
                padding: 20,
                border: "1px solid #eee",
                background: "#fff",
                borderRadius: 12,
                width: 420,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <h3 style={{ margin: "0 0 6px" }}>Budget</h3>
              <p style={{ margin: "0 0 12px", color: "#555" }}>
                Select your price range.
              </p>
              {/* Histogram */}
              <div
                style={{
                  height: 80,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  marginBottom: 12,
                }}
              >
                {buckets.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: Math.max(4, 70 * (v / maxBucket)),
                      background: "#f7c2ea",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
              {/* Single slider (max price) with RM labels and advanced toggles */}
              <div style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#444",
                    fontSize: 14,
                  }}
                >
                  <span>RM 0</span>
                  <span>RM 5000+</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={Number(maxPrice)}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: 8,
                  }}
                >
                  <label style={{ fontSize: 12, color: "#666" }}>UP TO</label>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      inputMode="numeric"
                      style={{ border: 0, outline: "none", width: "100%" }}
                    />
                    <span>RM</span>
                  </div>
                </div>
                {/* Advanced toggles inside budget */}
                <p style={{ margin: "12px 0 6px", fontWeight: 600 }}>
                  Advanced search
                </p>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={depositNotRequired}
                    onChange={(e) => setDepositNotRequired(e.target.checked)}
                  />{" "}
                  Deposit not required
                </label>
                <p style={{ margin: "12px 0 6px", fontWeight: 600 }}>
                  Bills included
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <label
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      checked={billWifi}
                      onChange={(e) => setBillWifi(e.target.checked)}
                    />{" "}
                    Wifi
                  </label>
                  <label
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      checked={billElectricity}
                      onChange={(e) => setBillElectricity(e.target.checked)}
                    />{" "}
                    Electricity
                  </label>
                  <label
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      checked={billWater}
                      onChange={(e) => setBillWater(e.target.checked)}
                    />{" "}
                    Water
                  </label>
                  <label
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      checked={billGas}
                      onChange={(e) => setBillGas(e.target.checked)}
                    />{" "}
                    Gas
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setBudgetOpen(false)}
                  style={{
                    marginTop: 8,
                    width: "100%",
                    background: "#0b6bcb",
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  View {filtered.length} results
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter dropdown (replaces Clear filters) */}
        <div className="relative" ref={filterRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMenu("filter")}
          >
            <span>Filter</span>
            <span
              className={
                filterOpen
                  ? "ml-2 -rotate-180 transition-transform"
                  : "ml-2 transition-transform"
              }
            >
              ▾
            </span>
          </Button>
          {filterOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                zIndex: 20,
                marginTop: 8,
                padding: 16,
                border: "1px solid #eee",
                background: "#fff",
                borderRadius: 12,
                width: 360,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <p style={{ margin: "0 0 8px", fontWeight: 600 }}>
                Advanced filters
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={depositNotRequired}
                    onChange={(e) => setDepositNotRequired(e.target.checked)}
                  />{" "}
                  Deposit not required
                </label>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={billWifi}
                    onChange={(e) => setBillWifi(e.target.checked)}
                  />{" "}
                  Wifi
                </label>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={billElectricity}
                    onChange={(e) => setBillElectricity(e.target.checked)}
                  />{" "}
                  Electricity
                </label>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={billWater}
                    onChange={(e) => setBillWater(e.target.checked)}
                  />{" "}
                  Water
                </label>
                <label
                  style={{ display: "flex", gap: 6, alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={billGas}
                    onChange={(e) => setBillGas(e.target.checked)}
                  />{" "}
                  Gas
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    background: "transparent",
                    color: "#0b6bcb",
                    border: 0,
                    padding: 0,
                  }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  style={{
                    background: "#0b6bcb",
                    color: "#fff",
                    border: 0,
                    padding: "8px 12px",
                    borderRadius: 8,
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search inputs row */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <Input
          placeholder="Search by Location, Property Name, or Cities"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        {loading ? (
          <p>Loading properties…</p>
        ) : filtered.length === 0 ? (
          <p>No properties match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
