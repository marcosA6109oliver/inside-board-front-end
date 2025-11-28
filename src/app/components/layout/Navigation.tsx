import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "@components/common/Search";
import Icon from "@components/common/Icon";
import Text from "@components/common/Text";
import Button from "@components/common/Button";

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
    return (
        <li className="nav-item">
            <Link
                to={to}
                className="tab tab-height-4 font-caption-large color-primary-white"
            >
                <Icon>
                    {icon}
                </Icon>
                <Text
                    tagType="span"
                    className="tab-label font-caption-large"
                >
                    {label}
                </Text>
            </Link>
        </li>
    );
};

const Navigation: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    type SampleData = string;

    const sampleData: SampleData[] = [
        "EN-0000001",
        "EN-0000002",
        "EN-0000003",
        "EN-0000004",
        "EN-0000005",
        "EN-0000006",
        "EN-0000007",
        "EN-0000008"

    ];

    return (
        <div className="container-fluid navigation pd-t-24 pd-b-16">
            <div className="row justify-content-between align-items-center">
                <div className="col-4 col-sm-5 col-md-8 col-lg-9">
                    <div className="menu-toggle d-lg-none">
                        <Button
                            className="btn-menu"
                            onClick={toggleMobileMenu}
                        >
                            <Icon
                                className="font-size-title-medium color-primary-white"
                            >
                                menu
                            </Icon>
                        </Button>
                    </div>
                    <ul className="menu d-none d-lg-flex">
                        <NavItem to="/quadro" icon="grid_view" label="Quadro" />
                        <NavItem to="/pauta" icon="list" label="Pauta" />
                        <NavItem to="/configuracoes" icon="settings" label="Configurações" />
                        <NavItem to="/painel-administrativo" icon="dashboard" label="Painel administrativo" />
                        <NavItem to="/dashboard" icon="analytics" label="Dashboard" />
                    </ul>
                </div>
                <div className="col-8 col-sm-7 col-md-4 col-lg-3">
                    <Search
                        data={sampleData}
                        className="search-container"
                        inputClassName="bg-primary-dark-3 bd-w-0 justify-content-center align-items-center font-caption-large"
                        resultsContainerClassName="results-container bg-primary-dark-3 bd-w-0"
                        resultItemClassName="result-item"
                        placeholder="Buscar"
                        onResultSelect={(item) => console.log(`Selected: ${item}`)}
                    />
                </div>
            </div>
            <div className={`mobile-menu-overlay d-lg-none ${isMobileMenuOpen ? "open" : "hidden"}`} style={{ display: isMobileMenuOpen ? "block" : "none" }}>
                <div className="mobile-menu-container">
                    <Button
                        className="btn-close-menu bg-primary-white pd-4 d-flex"
                        onClick={toggleMobileMenu}
                    >
                        <Icon
                            className="color-primary-dark-1 font-size-large">close
                        </Icon>
                    </Button>
                    <ul className="mobile-menu">
                        <NavItem to="/quadro" icon="grid_view" label="Quadro" />
                        <NavItem to="/pauta" icon="list" label="Pauta" />
                        <NavItem to="/configuracoes" icon="settings" label="Configurações" />
                        <NavItem to="/painel-administrativo" icon="dashboard" label="Painel administrativo" />
                        <NavItem to="/dashboard" icon="analytics" label="Dashboard" />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navigation;