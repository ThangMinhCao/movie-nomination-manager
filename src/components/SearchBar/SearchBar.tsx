import { ChangeEvent } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const SearchBar = ({ value, onChange, error }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        value={value}
        onChange={onChange}
        className="text-field"
        placeholder="Search..."
      />
      <div className="error-message">
        {error}
      </div>
    </div>
  );
};

export default SearchBar;
