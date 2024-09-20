import { Link } from "@remix-run/react";

const Header = () => (
  <div className="navbar bg-base-100">
    <div className="flex-1">
      <Link to="/" className="text-xl">
        M<span className="text-xs">atthews</span> F
        <span className="text-xs">amily</span> W
        <span className="text-xs">orkout</span> T
        <span className="text-xs">racker</span>
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="/view">View</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
