import React, { useState, useRef, useEffect } from "react";
import NewFrame from "@components/layout/NewFrame";
import Button from "@components/common/Button";
import Icon from "@components/common/Icon";
import Text from "@components/common/Text";
import Input from "@components/common/Input";

interface Board {
    id: number;
    name: string;
}

interface BoardManagerProps {
    board: Board;
    onUpdateName: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
    onMove: (id: number, direction: 'left' | 'right') => void;
}

const BoardManager: React.FC<BoardManagerProps> = ({ board, onUpdateName, onDelete, onMove }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(board.name);
    const [showOptions, setShowOptions] = useState(false);

    const optionsRef = useRef<HTMLDivElement>(null);

    const handleOpenModal = () => setModalOpen(true);

    const toggleEditing = () => {
        setIsEditing(true);
        setShowOptions(false); // Fechar as opções ao iniciar a edição
    };

    const handleEnterPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            confirmEdit();
        }
    };

    const confirmEdit = () => {
        onUpdateName(board.id, name);
        setIsEditing(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="column">
            <div className="content-head">
                <div className="bd-w-1 bd-color-primary-gray-light-2 pd-12 position-relative">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        {isEditing ? (
                            <div className="edit-input d-flex align-items-center position-absolute start-0 w-100 pd-x-8">
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    onKeyPress={handleEnterPress}
                                    onBlur={confirmEdit}
                                    autoFocus
                                    className="bg-primary-white d-block font-caption-large"
                                />
                                <Button onClick={confirmEdit} className="btn bg-primary-dark-1 d-inline-block color-primary-white">

                                    OK
                                </Button>
                            </div>
                        ) : (
                            <span className="font-caption-large">{name}</span>
                        )}

                        <Button className="btn pd-0" onClick={() => setShowOptions(!showOptions)}>
                            <Icon className="font-size-title-large fw-bold">more_horiz</Icon>
                        </Button>

                        {showOptions && (
                            <div className="dropdown-menu dropdown-menu-end show" ref={optionsRef}>
                                <a className="dropdown-item" onClick={toggleEditing}>
                                    <Icon className="fs-6 mg-r-8">edit</Icon> Editar
                                </a>
                                <a className="dropdown-item" onClick={() => onMove(board.id, 'left')}>
                                    <Icon className="fs-6 mg-r-8">arrow_back</Icon> Mover para esquerda
                                </a>
                                <a className="dropdown-item" onClick={() => onMove(board.id, 'right')}>
                                    <Icon className="fs-6 mg-r-8">arrow_forward</Icon> Mover para direita
                                </a>
                                <a className="dropdown-item" onClick={() => onDelete(board.id)}>
                                    <Icon className="fs-6 mg-r-8">delete</Icon> Apagar
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-primary-gray-light-2 btn pd-y-16" onClick={handleOpenModal}>
                    <div className="card-header d-flex justify-content-center gap-2 align-items-center">
                        <Text tagType="span" className="font-caption-large">CRIAR</Text>
                        <Button className="btn pd-0">
                            <Icon className="font-size-title-medium">add</Icon>
                        </Button>
                    </div>
                </div>
            </div>
            {isModalOpen && <NewFrame onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default BoardManager;