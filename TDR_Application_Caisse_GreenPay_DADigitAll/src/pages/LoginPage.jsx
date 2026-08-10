import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            console.log(response.data);

            login(response.data);
            navigate("/dashboard");
        }

        catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Identifiants incorrects.");
            } else {
                setError("Impossible de contacter le serveur.");
            }
        }

        finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">

                    Gestion des Caisses

                </h1>

                <p className="text-center text-gray-500 mb-8">

                    GreenPay & DA Digit All

                </p>

                {error && (

                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">

                        {error}

                    </div>

                )}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2">

                            Email

                        </label>

                        <input

                            type="email"

                            className="w-full border rounded-lg p-3"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <div>

                        <label className="block mb-2">

                            Mot de passe

                        </label>

                        <input

                            type="password"

                            className="w-full border rounded-lg p-3"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 transition"

                    >

                        {loading ? "Connexion..." : "Se connecter"}

                    </button>

                </form>

                <p className="text-center mt-6">
                    <Link
                        to="/mot-de-passe-oublie"
                        className="text-green-600 hover:text-green-700"
                    >
                        Mot de passe oublié ?
                    </Link>
                </p>

            </div>

        </div>

    );

}