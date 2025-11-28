import React from "react";
import Logo from "@components/common/Logo";
import UserInfo from "@components/layout/UserInfo";
import Navigation from "@components/layout/Navigation";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div className="main-header">
            <div className="container-fluid pd-y-24">
                <div className="row">
                    <div className="col-md-12">
                        <div className="top-bar">
                            <Logo />
                            <UserInfo />
                        </div>
                    </div>
                </div>
            </div>
            <Navigation />
        </div>
    );
};

export default Header;