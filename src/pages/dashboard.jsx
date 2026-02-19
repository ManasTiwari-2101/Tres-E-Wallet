import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("address");
        localStorage.removeItem("privateKey");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
            <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="text-xl font-semibold">Tres E-wallet</span>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </nav>

            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h2>
                    <p className="text-slate-600">Welcome to your Tres E-wallet dashboard</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
