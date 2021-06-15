const RepoItem = ({ id, repo, isStarred, onClickToggleStar }) => {
  return (
    <li className="list-group-item" aria-current="true">
      <a className="fw-bold" href={repo.html_url}>
        {repo.name}
      </a>
      <p className="fw-light">{repo.description}</p>
      <div className="d-flex justify-content-between">
        <span className="fst-italic">
          {isStarred ? repo.stargazers_count + 1 : repo.stargazers_count} stars
        </span>

        <button
          type="button"
          className={`star-btn star-${isStarred ? "dark" : "light"}`}
          onClick={onClickToggleStar}
        >
          ★
        </button>
      </div>
    </li>
  );
};

export default RepoItem;
