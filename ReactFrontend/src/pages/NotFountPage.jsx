import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div style={{ marginLeft: '700px', height: '300px', userSelect: 'none' }}>
            <h1>404 - Page Not Found</h1>
            <p style={{ marginTop: '100px', fontSize: '50px', marginLeft: '-250px', color: 'black', fontWeight: '900' }}>Aradığınız Sayfa Bulunamadı.</p>
            <button onClick={() => navigate('/')} style={{ fontSize: '50px', backgroundColor: 'lightgray', borderRadius: '10px', marginLeft: '-65px', cursor: 'pointer' }}>Ana Sayfaya Dön</button>
        </div>
    );
}

export default NotFoundPage;