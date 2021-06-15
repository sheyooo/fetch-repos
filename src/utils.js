const API_URL =
  "https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc";

export const fetchRepos = async () => {
  const res = await fetch(API_URL);
  const body = await res.json();

  if (!res.ok) {
    throw body;
  }

  return body;
};

export const makeDictionary = (repos) => {
  const dictionary = {};
  repos.forEach((r) => {
    dictionary[r.id] = r;
  });

  return dictionary;
};

export const getLanguages = (repos, reposById) => {
  return Object.keys(
    repos.reduce((accumulator, r) => {
      if (reposById[r]?.language) {
        accumulator[reposById[r]?.language] = null;
      }
      return accumulator;
    }, {})
  ).filter((v) => v);
};

export const getVisibleRepos = ({
  repos,
  reposById,
  languageFilter,
  starsById,
  showOnlyStarred,
}) => {
  let visibleRepos = repos.filter((id) => reposById[id]);

  if (languageFilter) {
    visibleRepos = visibleRepos.filter(
      (id) => reposById[id].language === languageFilter
    );
  }

  if (showOnlyStarred) {
    visibleRepos = Object.entries(starsById)
      .filter(([id, starred]) => starred)
      .map(([id, starred]) => parseInt(id));
  }

  return visibleRepos;
};
