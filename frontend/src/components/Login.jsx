import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async () => {
        setError('');
        setLoading(true);

        if(!username || !password){
            setError('Veuillez remplir tous les champs.');
            setLoading(false);
            return;
        }

        try {
            // Remplacez cette URL par l'URL de votre backend
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            // Stocker le token JWT dans le state (ou localStorage si nécessaire)
            login(data.access_token,data.username,data.roles,data.id);
            navigate("/home")
            
            
        } catch (err) {
            setError(err.message || 'Erreur lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    const gradientStyle = {
        background: 'linear-gradient(135deg, #31b5d3ff 0%, #80f4f4ff 50%, #9cd1faff 100%)',
        minHeight: '100vh'
    };
    
    const cardStyle = {
        maxWidth: '450px',
        margin: '0 auto'
    };
    
    const iconContainerStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '70px',
        height: '70px',
        margin: '0 auto 1.5rem',
        fontSize: '32px'
    };
    
    const btnStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none'
    };  
    
    return (
        <>
            <link 
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
                rel="stylesheet"
            />
            
            <div style={gradientStyle} className="d-flex align-items-center justify-content-center p-4">
                <div className="card shadow-lg" style={cardStyle}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <div 
                                style={iconContainerStyle}
                                className="rounded-circle d-flex align-items-center justify-content-center text-white"
                            >
                                🔒
                            </div>
                            <h1 className="fw-bold text-dark mb-2">Bienvenue</h1>
                            <p className="text-muted">Connectez-vous à votre compte</p>
                        </div>

                        <div>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Nom d'utilisateur</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        👤
                                    </span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="votre_nom_utilisateur"
                                        className="form-control"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Mot de passe</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        🔑
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
                                        placeholder="••••••••"
                                        className="form-control"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="btn btn-outline-secondary"
                                        disabled={loading}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="remember"
                                        disabled={loading}
                                    />
                                </div>
                                
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary w-100 py-2 fw-semibold"
                                style={btnStyle}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Connexion...
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </div>

                        
                    </div>
                </div>
            </div>
        </>
    )
}