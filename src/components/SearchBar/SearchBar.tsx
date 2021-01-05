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
      {
        !ready
        ? <> 
            <input
              value={value}
              onChange={onChange}
              className="text-field"
              placeholder="Search..."
            />
            <div className="error-message">
              {error}
            </div>
          </>
        : <div className="text-field-ready">
            Your nomination list is ready!
          </div>
      }
    </div>
  );
};

export default SearchBar;
