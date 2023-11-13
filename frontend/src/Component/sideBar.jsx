import {Link} from 'react-router-dom';
export default function SideBar(){

return(  
  <>
<div className="sidebar">
  <div className="logo-details">
    <i className='bx bxl-c-plus-plus icon'></i>
    <div className="logo_name">CodingLab</div>
    <i className='bx bx-menu' id="btn"></i>
  </div>
  <ul className="nav-list">
    <li>
    <Link to="/">
      <a href="/#">
        <i className='bx bx-grid-alt'></i>
        <span className="links_name">Dashboard</span>
      </a>
      <span className="tooltip">Dashboard</span>
    </Link>
    </li>
    <li>
      <Link to="/pharmacie">
      <a href="/#">
      <i class="bx bx-plus-medical"></i>
        <span className="links_name">Pharmacies</span>
      </a>
      </Link>
      <span className="tooltip">Pharmacies</span>
    </li>
    <li>
    <Link to="/traceability">
      <a href="">
        <i className='bx bx-edit'></i>
        <span className="links_name">Traceability</span>
      </a>
      <span className="tooltip">Traceability</span>
    </Link>
    </li>
    <li>
    <Link to="/commentaire">
      <a href="">
        <i className='bx bx-comment'></i>
        <span className="links_name">Commentaire</span>
      </a>
      <span className="tooltip">Commentaire</span>
    </Link>
    </li>
    <li className="profile" role="button">
      <i className='bx bx-log-out' id="log_out"></i>
    </li>
  </ul>
</div>
</>
)
}