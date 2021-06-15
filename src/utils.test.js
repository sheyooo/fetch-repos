import { getLanguages, makeDictionary, getVisibleRepos } from "./utils";

describe("getLanguages", () => {
  test("should get languages of repos", () => {
    const repos = [1, 2, 3, 4];
    const reposById = {
      1: { language: "js" },
      2: { language: "js" },
      3: { language: "ruby" },
      4: { language: "go" },
    };
    expect(getLanguages(repos, reposById)).toStrictEqual(["js", "ruby", "go"]);
  });

  test("should get languages of repos another case", () => {
    const repos = [1, 2, 3];
    const reposById = {
      1: { language: "js" },
      2: { language: "ruby" },
      3: { language: "go" },
    };
    expect(getLanguages(repos, reposById)).toStrictEqual(["js", "ruby", "go"]);
  });
});

describe("makeDictionary", () => {
  test("should turn array of repos into dictionary", () => {
    const repos = [
      { id: 1, language: "js", name: "pharma" },
      { id: 2, language: "js", name: "apotheke" },
      { id: 3, language: "ruby", name: "shop" },
      { id: 4, language: "go", name: "drugs" },
    ];
    expect(makeDictionary(repos)).toStrictEqual({
      1: { id: 1, language: "js", name: "pharma" },
      2: { id: 2, language: "js", name: "apotheke" },
      3: { id: 3, language: "ruby", name: "shop" },
      4: { id: 4, language: "go", name: "drugs" },
    });
  });
});

describe("getVisibleRepos", () => {
  const repos = [1, 2, 3, 4, 5];
  const reposById = {
    1: { id: 1, language: "js", name: "pharma" },
    2: { id: 2, language: "js", name: "apotheke" },
    3: { id: 3, language: "ruby", name: "shop" },
    4: { id: 4, language: "go", name: "drugs" },
    6: { id: 6, language: "php", name: "covid" },
  };

  test("should show only visible repos normal condition", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: null,
        starsById: {},
        showOnlyStarred: false,
      })
    ).toStrictEqual([1, 2, 3, 4]);
  });

  test("should not show starred repos when showOnlyStarred is false", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: null,
        starsById: { 1: true },
        showOnlyStarred: false,
      })
    ).toStrictEqual([1, 2, 3, 4]);
  });

  test("should show only starred repos", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: null,
        starsById: { 1: true },
        showOnlyStarred: true,
      })
    ).toStrictEqual([1]);
  });

  test("should show only filterred repos by language: js", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: "js",
        starsById: {},
        showOnlyStarred: false,
      })
    ).toStrictEqual([1, 2]);
  });

  test("should not show filterred repo if no more trending: php", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: "php",
        starsById: {},
        showOnlyStarred: false,
      })
    ).toStrictEqual([]);
  });

  test("should show only filterred repos by language: ruby", () => {
    expect(
      getVisibleRepos({
        repos,
        reposById,
        languageFilter: "ruby",
        starsById: {},
        showOnlyStarred: false,
      })
    ).toStrictEqual([3]);
  });
});
