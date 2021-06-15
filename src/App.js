import "./App.css";

import { useEffect, useState } from "react";

import RepoItem from "./components/RepoItem";
import FilterLangSelect from "./components/FilterLangSelect";

import { fetchRepos, getVisibleRepos, makeDictionary } from "./utils";

function App() {
  const [languageFilter, setLanguageFilter] = useState(null);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);

  const [repos, setRepos] = useState([]);
  const [reposById, setReposById] = useState({});
  const [starsById, setStarsById] = useState(
    JSON.parse(localStorage.getItem("starsById") || "{}")
  );

  // Fetcht Repos
  useEffect(() => {
    fetchRepos()
      .then((res) => {
        setReposById(makeDictionary(res.items));
        setRepos(res.items.map((repo) => repo.id));
      })
      .catch((err) => {
        alert("Something went wrong! \n" + err.message);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("starsById", JSON.stringify(starsById));
  }, [starsById]);

  const reposToView = getVisibleRepos({
    repos,
    reposById,
    languageFilter,
    starsById,
    showOnlyStarred,
  });

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
          <div className="d-flex justify-content-between m-2">
            <div>
              <h3>Github Repos</h3>

              <FilterLangSelect
                repos={repos}
                reposById={reposById}
                onChange={(event) => setLanguageFilter(event.target.value)}
              />
            </div>

            <div>
              <button
                className="btn btn-link filter-repo-text m-2"
                onClick={() => setShowOnlyStarred(!showOnlyStarred)}
              >
                ⭐ Filter Starred Repos
              </button>
            </div>
          </div>
          <ul className="list-group">
            {reposToView.map((id) => {
              const repo = reposById[id];

              return (
                <RepoItem
                  key={id}
                  id={id}
                  repo={repo}
                  isStarred={starsById[id]}
                  onClickToggleStar={() => {
                    setStarsById({ ...starsById, [id]: !starsById[id] });
                  }}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
