import "./App.css";

import { useEffect, useState } from "react";

import RepoItem from "./components/RepoItem";
import FilterLangSelect from "./components/FilterLangSelect";

import { fetchRepos, getVisibleRepos, makeDictionary } from "./utils";

function App() {
  const [languagesFilter, setLanguagesFilter] = useState({});
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [paginationData, setPaginationData] = useState({
    perPage: 10,
    page: 1,
  });

  const [repos, setRepos] = useState([]);
  const [reposById, setReposById] = useState({});
  const [starsById, setStarsById] = useState(
    JSON.parse(localStorage.getItem("starsById") || "{}")
  );

  const addRepos = (res) => {
    const fetchedRepos = makeDictionary(res.items);
    const fetchedRepoIds = res.items.map((repo) => repo.id);

    setReposById({ ...reposById, ...fetchedRepos });
    // Make unique incase github sends a repo that was already on a previous page
    setRepos([...new Set([...repos, ...fetchedRepoIds])]);
  };

  // Fetcht Repos
  useEffect(() => {
    fetchRepos(paginationData)
      .then(addRepos)
      .catch((err) => {
        alert("Something went wrong! \n" + err.message);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("starsById", JSON.stringify(starsById));
  }, [starsById]);

  const onClickLoadMore = () => {
    const newPageQuery = {
      page: paginationData.page + 1,
      perPage: paginationData.perPage,
    };
    fetchRepos(newPageQuery).then(addRepos);

    setPaginationData(newPageQuery);
  };

  const reposToView = getVisibleRepos({
    repos,
    reposById,
    languagesFilter,
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
                onChange={(ev) => {
                  setLanguagesFilter({
                    ...languagesFilter,
                    [ev.lang]: ev.isChecked,
                  });
                }}
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

          <button
            className="btn btn-link filter-repo-text m-2"
            onClick={() => onClickLoadMore()}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
