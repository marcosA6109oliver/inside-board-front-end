import React, { useState, useEffect } from "react";
import Input from "@components/common/Input";

interface StringSearchProps {
    data: string[];
    onResultSelect: (result: string) => void;
    className?: string;
    inputClassName?: string;
    resultsContainerClassName?: string;
    resultItemClassName?: string;
    placeholder?: string;
}

const StringSearch: React.FC<StringSearchProps> = ({
    data,
    onResultSelect,
    className = '',
    inputClassName = '',
    resultsContainerClassName = '',
    resultItemClassName = '',
    placeholder = '',
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') clearSearch();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const clearSearch = () => {
        setSearchTerm('');
        setShowResults(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        setShowResults(newValue !== '');
    };

    const filteredData = data.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectItem = (item: string) => {
        setSearchTerm(item);
        setShowResults(false);
        onResultSelect(item);
    };

    return (
        <div className={`${className}`}>
            <Input
                type="text"
                className={inputClassName}
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                leftIcon={{ children: "search" }}
                rightIcon={
                    searchTerm ? { children: "clear", className: "cursor-pointer pd-r-8", onClick: clearSearch } : undefined
                }
            />
            {showResults && (
                <ul className={`${resultsContainerClassName}`}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <li
                                key={index}
                                className={` ${resultItemClassName}`}
                                onClick={() => handleSelectItem(item)}
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className={` ${resultItemClassName}`}>Nenhum resultado encontrado</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default StringSearch;