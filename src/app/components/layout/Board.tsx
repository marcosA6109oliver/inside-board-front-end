import React from "react";
import BoardManager from "./BoardManager";

interface Board {
    id: number;
    name: string;
}

interface BoardProps {
    boards: Board[];
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

const Board: React.FC<BoardProps> = ({ boards, setBoards }) => {
    const handleDeleteBoard = (id: number) => {
        setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
    };

    const handleUpdateBoardName = (id: number, newName: string) => {
        setBoards(prevBoards =>
            prevBoards.map(board => (board.id === id ? { ...board, name: newName } : board))
        );
    };

    const moveBoard = (id: number, direction: 'left' | 'right') => {
        const index = boards.findIndex(board => board.id === id);
        if ((direction === 'left' && index <= 0) || (direction === 'right' && index >= boards.length - 1)) return;

        const newBoards = [...boards];
        const [removedBoard] = newBoards.splice(index, 1);
        newBoards.splice(direction === 'left' ? index - 1 : index + 1, 0, removedBoard);

        setBoards(newBoards);
    };

    return (
        <div className="container-fluid pd-x-0">
            <div className="board">
                <ul className="columns-list pd-l-24 pd-r-12 pd-t-24" id="boardContainer">
                    {boards.map(board => (
                        <li key={board.id}>
                            <BoardManager
                                board={board}
                                onUpdateName={handleUpdateBoardName}
                                onDelete={handleDeleteBoard}
                                onMove={moveBoard}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Board;