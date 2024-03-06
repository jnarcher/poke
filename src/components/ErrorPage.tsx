import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="mb-10 text-[50px]">Unable to load page.</h1>
            <Link
                to="/"
                className="hover:brightness-110 bg-red-500 p-3 rounded-md text-xl hover:scale-105 transition-all"
            >
                Back
            </Link>
        </div>
    );
}

export default ErrorPage;
