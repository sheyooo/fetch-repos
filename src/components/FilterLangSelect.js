import { getLanguages } from "../utils";

const FilterLangSelect = ({ repos, reposById, onChange }) => {
  return (
    <select
      className="form-select"
      aria-label="Filter by language"
      onChange={onChange}
    >
      <option value="">All languages</option>
      {getLanguages(repos, reposById).map((lang) => {
        return (
          <option key={lang} value={lang}>
            {lang}
          </option>
        );
      })}
    </select>
  );
};

export default FilterLangSelect;
