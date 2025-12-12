import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [showPassword, setShowPassword] = useState (false)
    const [error, setError] = useState("")

    const handleSubmit = () =>{
        setError('');

        if(!email || !password){
            setError('Veuillez remplir tous les champs.');
            return;
        }

        console.log('Login:',{email, password});
        alert('Connexion réussie !');
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
                                <label className="form-label fw-medium">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        📧
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        className="form-control"
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
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                        placeholder="••••••••"
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="btn btn-outline-secondary"
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
                                    />
                                    <label className="form-check-label text-muted" htmlFor="remember">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <a href="#" className="text-decoration-none fw-medium" style={{color: '#667eea'}}>
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary w-100 py-2 fw-semibold"
                                style={btnStyle}
                            >
                                Se connecter
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <small className="text-muted">
                                Pas encore de compte ?{' '}
                                <a href="#" className="text-decoration-none fw-medium" style={{color: '#667eea'}}>
                                    Contactez l'administrateur
                                </a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}