import "./Navbar.css";
import { useScrollVisibility } from "../../utils/scrollUtils";

const Navbar = () => {
  const show = useScrollVisibility();
  return (
    <nav className={`navbar ${show ? "show" : "hide"}`}>
      <div className="navbar-brand">Wolt</div>
    </nav>
  );
};

export default Navbar;
