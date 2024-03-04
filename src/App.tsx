import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TournamentProvider from "./providers/TournamentProvider";
import Setup from "./views/Setup";
import InGame from "./views/InGame";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Setup />,
    },
    {
        path: "/tournament",
        element: <InGame />
    }
]);

function App() {
    return (
        <TournamentProvider>
            <Navbar />
            <div className="p-4 pt-[5.5rem] w-full h-full">
                <RouterProvider router={router} />
            </div>
        </TournamentProvider>
    );
}

export default App;
