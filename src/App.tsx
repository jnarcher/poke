import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TournamentProvider from "./providers/TournamentProvider";
import Setup from "./views/Setup";
import BlindLevelCoundown from "./components/BlindLevelCountdown";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Setup />,
    },
    {
        path: "/tournament",
        element: <BlindLevelCoundown />
    }
]);

function App() {
    return (
        <TournamentProvider>
            <div className="p-4">
                <RouterProvider router={router} />
            </div>
        </TournamentProvider>
    );
}

export default App;
