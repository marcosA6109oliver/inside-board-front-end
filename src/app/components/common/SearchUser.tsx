import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@components/common/Icon';
import Input from '@components/common/Input';

type User = {
    id: number;
    name: string;
    email: string;
    initials: string;
    colorClass: string;
};

const SearchUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [query, setQuery] = useState<string>("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<User[]>([]);
    const [showInput, setShowInput] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const colorClasses = [
        "bg-secondary-orange",
        "bg-secondary-turquoise",
        "bg-secondary-blue",
        "bg-support-green-1",
        "bg-support-pink-2",
        "bg-support-red-bd",
        "bg-support-navy-4",
        "bg-support-green-2"
    ];

    const fetchUsers = useCallback(async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');
            if (!apiUrl) {
                console.error("API URL não configurada");
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token de autenticação não encontrado");
                return;
            }

            const response = await fetch(`${apiUrl}/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const usersData = result.data?.data?.user || [];
            const preparedUsers = usersData.map((user: any) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                initials: user.name.split(' ').slice(0, 2).map((word: string) => word.charAt(0)).join(''),
                colorClass: colorClasses[Math.floor(Math.random() * colorClasses.length)]
            }));

            setUsers(preparedUsers);
            localStorage.setItem('users', JSON.stringify(preparedUsers));
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }, []);

    const handleInputClick = () => {
        if (users.length === 0) {
            fetchUsers();
        }
        setShowInput(true);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            const queryLower = query.toLowerCase();
            const filtered = users.filter(user =>
                !selectedUsers.some(selected => selected.id === user.id) &&
                (user.name.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower))
            );
            setFilteredSuggestions(filtered);
        }, 300); // Implementação de debouncing

        return () => {
            clearTimeout(handler);
        };
    }, [query, users, selectedUsers]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowInput(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSelectUser = (user: User) => {
        setSelectedUsers((prev) => [...prev, user]);
        setQuery("");
        setShowInput(false);
    };

    const handleRemoveUser = (user: User) => {
        setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
    };

    const updateSelectedUsersDisplay = () => {
        return selectedUsers.map((user) => (
            <div className="avatar-container font-caption-medium" key={user.id}>
                <div className={`avatar ${user.colorClass}`}>
                    <span className="color-primary-white">{user.initials}</span>
                </div>
                <div className="avatar-details">
                    <span className="avatar-name">{user.name}</span>
                    <span onClick={() => handleRemoveUser(user)}>
                        <Icon className="icon-remove">close</Icon>
                    </span>
                </div>
            </div>
        ));
    };

    return (
        <div className="input-container search-container font-caption-large search-avatar" ref={wrapperRef} onClick={handleInputClick}>
            <div className="pd-12 d-flex bg-primary-white bd-w-1 bd-color-primary-gray-light-2 align-items-center">
                <Icon className="color-primary-gray-dark">search</Icon>
                <div className="resultadoUser input-icon">
                    {updateSelectedUsersDisplay()}
                </div>
            </div>
            {showInput && (
                <div id="resultadoAvatar" className="input-wrapper d-block bg-primary-white">
                    <Input
                        type="text"
                        className="bd-w-0"
                        placeholder="Digite um nome ou email"
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    />
                    <div className="suggestions-list">
                        {filteredSuggestions.map((user) => (
                            <div
                                className="avatar-container font-caption-medium"
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                            >
                                <div className={`avatar ${user.colorClass}`}>
                                    <span className="color-primary-white">{user.initials}</span>
                                </div>
                                <div className="avatar-details">
                                    <span className="avatar-name">{user.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchUser;