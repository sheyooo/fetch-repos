import { getLanguages } from "../utils";

const FilterLangSelect = ({ repos, reposById, onChange }) => {
  return (
    <form>
      {getLanguages(repos, reposById).map((lang) => {
        return (
          <div key={lang}>
            <input
              className="form-check-input"
              type="checkbox"
              value={lang}
              id={lang}
              onChange={(event) =>
                onChange({
                  lang: event.target.value,
                  isChecked: event.target.checked,
                })
              }
            />
            <label className="form-check-label" htmlFor={lang}>
              {lang}
            </label>
          </div>
        );
      })}
    </form>
  );
};

export default FilterLangSelect;
