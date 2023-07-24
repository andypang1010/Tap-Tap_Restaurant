import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardNav.css';
import 'boxicons/css/boxicons.min.css';

function DashboardNav() {

    return (
        <header className="header">
            <Link className="logo" to={"#"}>TechCafe</Link>

            <nav className="navbar">
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-home bx-xs' />
                        Home
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-home bx-sm' />
                    </div>
                </Link>
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-grid-alt bx-xs' />
                        Tables
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-grid-alt bx-sm' />
                    </div>
                </Link>
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-bar-chart-square bx-xs' />
                        Statistics
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-bar-chart-square bx-sm' />
                    </div>
                </Link>
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-notepad bx-xs' />
                        Sales History
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-notepad bx-sm' />
                    </div>
                </Link>
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-comment-detail bx-xs' />
                        Customer Reviews
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-comment-detail bx-sm' />
                    </div>
                </Link>
                <Link className="link" to={"#"}>
                    <div className="fullscreen-only">
                        <i className='bx bxs-user-account bx-xs' />
                        Account Details
                    </div>
                    <div className="windowed-only">
                        <i className='bx bx-user-account bx-sm' />
                    </div>
                </Link>
            </nav>
        </header>
    );
};

export default DashboardNav;