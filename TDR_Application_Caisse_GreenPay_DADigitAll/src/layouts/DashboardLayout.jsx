import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Header />

                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}