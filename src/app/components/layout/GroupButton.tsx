import React, { useState, useEffect, useRef } from "react";
import Button from "@components/common/Button";
import Icon from "@components/common/Icon";
import NewFrame from "@components/layout/NewFrame";
import FilterView from "@components/layout/FilterView";
import ExportDados from "@components/layout/ExportDados";

interface GroupButtonProps {
    onAddTask: () => void;  // Define a função que é disparada ao clicar em "Novo quadro"
}

const GroupButton: React.FC<GroupButtonProps> = ({ onAddTask }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [isExportOpen, setExportOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const exportRef = useRef<HTMLDivElement>(null);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleToggleFilter = () => setFilterOpen(prev => !prev);
    const handleCloseFilter = () => setFilterOpen(false);

    const handleToggleExport = () => setExportOpen(prev => !prev);
    const handleCloseExport = () => setExportOpen(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                handleCloseFilter();
            }
            if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
                handleCloseExport();
            }
        };

        const handleEscPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseFilter();
                handleCloseExport();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscPress);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscPress);
        };
    }, []);

    return (
        <div className="btn-group">
            <Button className="btn-icon btn-secon">
                <Icon>send_to_mobile</Icon>
                Minhas tarefas
            </Button>
            <Button className="btn-icon btn-secon" onClick={onAddTask}>
                <Icon>add_circle_outline</Icon>
                Novo quadro
            </Button>
            <Button className="btn-icon btn-secon" onClick={handleToggleExport}>
                <Icon>filter_alt</Icon>
                Exportar
            </Button>
            <Button className="btn-icon btn-secon" onClick={handleToggleFilter}>
                <Icon>filter_alt</Icon>
                Exibir
            </Button>

            {isModalOpen && <NewFrame onClose={handleCloseModal} />}
            {isFilterOpen && (
                <div ref={filterRef}>
                    <FilterView />
                </div>
            )}
            {isExportOpen && (
                <div ref={exportRef}>
                    <ExportDados onClose={handleCloseExport} />
                </div>
            )}
        </div>
    );
};

export default GroupButton;