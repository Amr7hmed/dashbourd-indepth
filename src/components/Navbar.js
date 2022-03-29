import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="menu-links border-end" id="menu">
      <ul>
        <li className="nav-item">
          <NavLink
            to="/Users"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fa-users me-2" aria-hidden="true"></i>
            <span>Users</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/Services"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fa-cogs me-2" aria-hidden="true"></i>
            <span>Services</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/StaticContent"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fas fa fa-file-word me-2"></i>
            <span>Static Content</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/PageHeader"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fas fa-image me-2" aria-hidden="true"></i>
            <span>Page Header</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Slider"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fa-images me-2" aria-hidden="true"></i>
            <span>Slider</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/ClientCategory"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fas fa-calendar-plus  me-2"></i>
            <span>Client Category</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/Clients"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fa-handshake me-2" aria-hidden="true"></i>
            <span>Clients</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/Partitions"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fas fa fa-layer-group me-2"></i>
            <span>Partitions</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/Card"
            className={(isActive) =>
              "d-flex align-items-center nav-link " +
              (!isActive ? " " : "active")
            }
          >
            <i className="fa fa-clipboard me-2" aria-hidden="true"></i>
            <span>Card</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
