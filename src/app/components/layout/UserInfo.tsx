import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Text from "@components/common/Text";
import Icon from "@components/common/Icon";
import { logoutUser } from "../../actions/userActions";
import { RootState } from "../../types";

const UserInfo: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const userName = user?.data.name || "Usuário";

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(logoutUser());
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const avatarInitials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2);

    return (
        <div className="user-info" ref={dropdownRef}>
            <div className="avatar-container font-caption-medium" onClick={toggleDropdown}>
                <div className="avatar bg-feedback-green">
                    <Text tagType="span" className="color-primary-white">
                        {avatarInitials}
                    </Text>
                </div>
                <div className="avatar-details d-none d-lg-block">
                    <Text tagType="span" className="avatar-name">
                        {userName}
                    </Text>
                </div>
                <Icon className="font-size-large">
                    expand_more
                </Icon>
            </div>
            {dropdownVisible && (
                <div className="dropdown">
                    <div className="dropdown-content align-items-center gap-2 color-primary-dark-1">
                        <Icon className="font-size-large">
                            exit_to_app
                        </Icon>
                        <a href="#" className="color-primary-dark-1" onClick={handleLogout}>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;