import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <>
        {/*Main Navigation*/}
        <header>
          {/* Sidebar */}
          <nav
            id="sidebarMenu"
            className="collapse d-lg-block sidebar collapse bg-white"
          >
            <div className="position-sticky">
              <div className="list-group list-group-flush mx-3 mt-4">
                <a
                  href="#"
                  className="list-group-item list-group-item-action py-2 ripple"
                  aria-current="true"
                >
                  <i className="fas fa-tachometer-alt fa-fw me-3" />
                  <span>Main dashboard</span>
                </a>
                <a
                  href="#"
                  className="list-group-item list-group-item-action py-2 ripple active"
                >
                  <i className="fas fa-chart-area fa-fw me-3" />
                  <span>Webiste traffic</span>
                </a>
                <a
                  href="#"
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-lock fa-fw me-3" />
                  <span>Password</span>
                </a>
                <a
                  href="#"
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-chart-line fa-fw me-3" />
                  <span>Analytics</span>
                </a>
                <Link
                  href="#"
                  to='/home'
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-home fa-fw me-3" />
                  <span>Home</span>
                </Link>
                <a
                  href="#"
                  className="list-group-item list-group-item-action py-2 ripple"
                >
                  <i className="fas fa-chart-bar fa-fw me-3" />
                  <span>Orders</span>
                </a>
              </div>
            </div>
          </nav>
          {/* Sidebar */}
        </header>
        {/*Main Navigation*/}
        {/*Main layout*/}
        <main style={{ marginTop: 58 }}>
          <div className="container pt-4" />
        </main>
        {/*Main layout*/}
      </>
    </div>
  );
};

export default Dashboard;
