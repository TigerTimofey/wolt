import "./Navbar.css";
import { useScrollVisibility } from "../../hooks/styles/scrollUtils";
import { ThemeManager } from "../../hooks/styles/Themes";

const Navbar = () => {
  const show = useScrollVisibility();

  return (
    <nav className={`navbar ${show ? "show" : "hide"}`}>
      <div className="navbar-brand">Wolt</div>
      <ThemeManager />
    </nav>
  );
};

export default Navbar;
