import TournamentProvider from "./providers/TournamentProvider";
import Setup from "./views/Setup";

function App() {

    return (
        <TournamentProvider>
            <div className="p-4">
                <Setup/>
            </div>
        </TournamentProvider>
    );
}

export default App;
