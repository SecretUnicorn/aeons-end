import reactLogo from "@/assets/react.svg";

function Header() {
  return (
    <div>
      {" "}
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

export default Header;
