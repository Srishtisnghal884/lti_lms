import { useEffect } from "react";
import { useMemo, useRef } from "react";
import { useState } from "react";

export function SearchableSelect({ label, options, value, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Find the currently selected item object to display its name/label
  const selectedItem = options.find((opt) => opt.value === value);

  // Filter options based on the search term
  const filteredOptions = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [searchTerm, options]);

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Utility function to handle selection
  const handleSelect = (option) => {
    onChange(option.value);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="field" ref={containerRef}>
      <label className="label">{label}</label>
      <input
        type="text"
        placeholder="Search categories..."
        value={isOpen ? searchTerm : selectedItem ? selectedItem.label : ""}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true); // Ensure it stays open while typing
        }}
      />

      {isOpen && (
        <div className="custom-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`dropdown-item ${
                  option.value === value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="dropdown-item disabled">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
}