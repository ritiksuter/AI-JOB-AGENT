import { Search, RotateCw } from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";

const SearchBar = ({
  search,
  onSearchChange,
  onSearch,
  searching = false,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm

        lg:flex-row
        lg:items-end
      "
    >
      <div className="flex-1">
        <Input
          label="Search Jobs"
          name="search"
          value={search}
          onChange={onSearchChange}
          placeholder="Google, Backend Developer, Remote..."
        />
      </div>

      <Button
        onClick={onSearch}
        loading={searching}
      >
        <div className="flex items-center gap-2">
          {searching ? (
            <RotateCw
              size={18}
              className="animate-spin"
            />
          ) : (
            <Search size={18} />
          )}

          <span>Find Jobs Now</span>
        </div>
      </Button>
    </div>
  );
};

export default SearchBar;