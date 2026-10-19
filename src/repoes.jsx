
import { useEffect, useState } from "react";

export const Repos = ({ name }) => {
  const [repo, setRepo] = useState([]);
  const [error, setError] = useState("");
  const languageLogos = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "openjdk",
  C: "c",
  "C++": "cplusplus",
  HTML: "html5",
  CSS: "css",
  PHP: "php",
  Go: "go",
  Rust: "rust",
  Ruby: "ruby",
};

  useEffect(() => {
    if (!name) return;

    async function loadingRepos() {
      setError("");
      setRepo([]);

      try {
       const response = await fetch(
  `https://api.github.com/users/${name}/repos?per_page=10`
);
        if (response.status === 403 || response.status === 429) {
          throw new Error("GitHub API limit reached. Try again later.");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch repositories.");
        }

        const data = await response.json();
        setRepo(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      }
    }

    loadingRepos();
  }, [name]);

  return (
    <div className="user_repoes">
      <h2>Repositories</h2>

      {error && <p>{error}</p>}

      {!error && repo.length === 0 && (
        <p>No repositories found.</p>
      )}

      {repo.map((item) => (
        <div key={item.id} className="repo-card">
          <h3>{item.name}</h3>

          <p>{item.description || "No description available"}</p>
           {item.language && (
  <div className="language">
    <img
      src={`https://cdn.simpleicons.org/${languageLogos[item.language] || item.language.toLowerCase()}`}
      alt={item.language}
      width="20"
      height="20"
    />
    <span>{item.language}</span>
  </div>
)}
          <p>⭐ {item.stargazers_count}</p>
          <p>Forks:  {item.forks_count}</p>

          <a href={item.html_url} target="_blank" rel="noreferrer">
            View Repository
          </a>
        </div>
      ))}
    </div>
  );
};
