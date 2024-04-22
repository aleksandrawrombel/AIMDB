import github_logo from "../assets/github_logo.png";

function GithubLogo() {
  return (
    <div className="github_logo_container">
      <a href="https://github.com/aleksandrawrombel/AIMDB" target="_blank">
        <img src={github_logo} className="github_logo" alt="github_logo"/>
      </a>
    </div>
  );
}

export default GithubLogo;
