import github_logo from "../assets/github_logo.png";

function GithubLogo() {
  return (
    <footer className="footer_container">
      <a href="https://github.com/aleksandrawrombel/AIMDB" target="_blank" className="footer_link">
        <img src={github_logo} className="github_logo" alt="github_logo"/>
      </a>
    </footer>
  );
}

export default GithubLogo;
