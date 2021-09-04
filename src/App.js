import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Switch, Route, Link } from "react-router-dom";
import AddEmploye from "./components/AddEmploye";
import Employe from "./components/Employe";
import EmployeList from "./components/EmployeList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/employes" className="navbar-brand">
          Liste des employés
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/employes"} className="nav-link">
              Employés
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/employes"]} component={EmployeList} />
          <Route exact path="/add" component={AddEmploye} />
          <Route path="/employes/:id" component={Employe} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
