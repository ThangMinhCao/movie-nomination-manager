import { ChangeEvent } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  ready: boolean;
}

const SearchBar = ({ value, onChange, error, ready }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        value={ready ? "Your nomination list is ready!" : value}
        onChange={onChange}
        className={ready ? "text-field-ready" : "text-field"}
        placeholder="Search..."
        disabled={ready}
      />
      <div className="error-message">
        {error}
      </div>
    </div>
  );
};

export default SearchBar;
