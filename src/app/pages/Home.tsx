import React, { useState, useEffect } from "react";
import Header from "@components/layout/Header";
import GroupButton from "@components/layout/GroupButton";
import Board from "@components/layout/Board";
import { useLocation } from "react-router-dom";
import WelcomeScreen from "@components/layout/WelcomeScreen";

interface BoardInterface {
    id: number;
    name: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const userName = location.state?.userName || "usuário";

    const [showWelcome, setShowWelcome] = useState<boolean>(() => {
        if (!sessionStorage.getItem("hasSeenWelcome")) {
            sessionStorage.setItem("hasSeenWelcome", "true");
            return true;
        }
        return false;
    });

    const [boards, setBoards] = useState<BoardInterface[]>([]);

    const addBoard = () => {
        const newBoard: BoardInterface = {
            id: Date.now(),
            name: `Quadro ${boards.length + 1}`
        };
        setBoards(prevBoards => [...prevBoards, newBoard]);
    };

    useEffect(() => {
        if (showWelcome) {
            setTimeout(() => {
                setShowWelcome(false);
            }, 3800);
        }
    }, [showWelcome]);

    return (
        <>
            {showWelcome && (
                <WelcomeScreen
                    name={userName}
                    onComplete={() => setShowWelcome(false)}
                />
            )}
            <div className={`home ${showWelcome ? 'hidden' : 'visible'}`}>
                <Header />
                <div className="container-fluid pd-t-16">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <GroupButton onAddTask={addBoard} />
                        </div>
                    </div>
                </div>
                <Board boards={boards} setBoards={setBoards} />
            </div>
        </>
    );
};

export default Home;