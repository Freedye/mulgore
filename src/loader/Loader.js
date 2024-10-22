import logo from '../Images/banner.png';
import './Loader.css';


function Loader() {
    return (
        <div className="Loader">
          <header className="Loader-header">
            <img src={logo} className="Loader-logo" alt="logo" />
            <p>
              Mulgore powered by Freedye.
            </p>
          </header>
        </div>
      );
}

export default Loader;