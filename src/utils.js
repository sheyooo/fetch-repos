const API_URL = "https://api.github.com/search/repositories";

export const fetchRepos = async ({ perPage = 10, page = 1 } = {}) => {
  const queryParams = `?q=created:%3E2017-01-10&sort=stars&order=desc&per_page=${perPage}&page=${page}`;

  const res = await fetch(API_URL + queryParams);
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
  languagesFilter,
  starsById,
  showOnlyStarred,
}) => {
  let visibleRepos = repos.filter((id) => reposById[id]);

  visibleRepos = visibleRepos.filter((id) => {
    let showForLanguage = true;
    let showForStar = true;

    if (Object.values(languagesFilter).filter((v) => v).length > 0) {
      const langEntries = Object.entries(languagesFilter);

      showForLanguage = langEntries
        .filter(([lang, isChecked]) => isChecked)
        .some(([lang, isChecked]) => reposById[id].language === lang);
    }

    if (showOnlyStarred) {
      showForStar = starsById[id];
    }

    return showForLanguage && showForStar;
  });

  return visibleRepos;
};
