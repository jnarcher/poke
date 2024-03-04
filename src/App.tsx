import { Outlet } from "react-router-dom";
import TournamentProvider from "./providers/TournamentProvider";
import Navbar from "./components/Navbar";


function App() {
    return (
        <TournamentProvider>
            <Navbar />
            <div className="p-4 pt-[5.5rem] w-full h-full">
                <Outlet />
            </div>
        </TournamentProvider>
    );
}

export default App;
