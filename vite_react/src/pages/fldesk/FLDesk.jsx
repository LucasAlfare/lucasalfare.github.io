import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, Outlet, useLocation } from 'react-router-dom';

function BarcodeInputSaleComponent({ apiBaseUrl, onSaleCompleted }) {
    const [barcode, setBarcode] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);
    const [paymentType, setPaymentType] = useState('Cash');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.requestedQuantity, 0);

    // Handle adding a product by barcode
    const addItem = async () => {
        if (!barcode) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${apiBaseUrl}/products/barcode/${encodeURIComponent(barcode)}`
            );
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const product = await response.json();
            // add with requested quantity
            setItems(prev => [
                ...prev,
                { ...product, requestedQuantity: quantity }
            ]);
            setBarcode('');
            setQuantity(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle finalize sale
    const finalizeSale = async () => {
        if (items.length === 0) return;
        const saleRequest = {
            paymentType,
            items: items.map(item => ({
                barcode: item.barcode,
                quantity: item.requestedQuantity
            }))
        };
        setLoading(true);
        setError(null);
        try {
            const resp = await fetch(`${apiBaseUrl}/sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleRequest)
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const result = await resp.json();
            // callback for parent
            onSaleCompleted(result);
            // reset
            setItems([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Código de barras"
                    value={barcode}
                    onChange={e => setBarcode(e.target.value)}
                    disabled={loading}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)}
                    disabled={loading}
                    style={{ width: '4rem', marginRight: '0.5rem' }}
                />
                <button onClick={addItem} disabled={loading}>
                    Add
                </button>
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <ul>
                {items.map((item, idx) => (
                    <li key={`${item.barcode}-${idx}`}>
                        {item.barcode} | {item.name} | R$ {(item.price / 100).toFixed(2)} ({item.requestedQuantity})
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
                <strong>Total: R$ {(total / 100).toFixed(2)}</strong>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <label>
                    Tipo de pagamento:{' '}
                    <select
                        value={paymentType}
                        onChange={e => setPaymentType(e.target.value)}
                        disabled={loading}
                    >
                        <option value="Cash">Dinheiro</option>
                        <option value="Credit">Cartão de crédito</option>
                        <option value="Debit">Cartão débito</option>
                        <option value="Pix">PIX</option>
                    </select>
                </label>
            </div>

            <button
                onClick={finalizeSale}
                disabled={loading || items.length === 0}
                style={{ marginTop: '1rem' }}
            >
                Finalizar
            </button>

            {loading && <div>Carregando...</div>}
        </div>
    );
}

function SaleViewerComponent({ apiBaseUrl, onSaleViewed }) {
    const [saleId, setSaleId] = React.useState('');
    const [sales, setSales] = React.useState([]);
    const [error, setError] = React.useState(null);

    const fetchSales = async () => {
        setError(null);
        try {
            const endpoint = saleId.trim() === '' ? `${apiBaseUrl}/sales` : `${apiBaseUrl}/sales/${saleId}`;
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Erro ao buscar dados');
            const data = await response.json();
            const salesData = Array.isArray(data) ? data : [data];
            setSales(salesData);

            if (onSaleViewed) {
                onSaleViewed(salesData);
            }
        } catch (err) {
            setError(err.message || 'Erro desconhecido');
            setSales([]);
        }
    };

    const formatDate = (iso) => new Date(iso).toLocaleString();

    const formatCurrency = (valueInCents) => {
        return (valueInCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'Arial' }}>
            <h2>Consulta de Vendas</h2>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={saleId}
                    onChange={(e) => setSaleId(e.target.value)}
                    placeholder="ID da venda (deixe vazio para todas)"
                    style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
                />
                <button onClick={fetchSales} style={{ padding: '0.5rem 1rem' }}>Buscar</button>
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {sales.length > 0 && sales.map((sale) => {
                const totalInCents = sale.items.reduce(
                    (acc, item) => acc + item.priceAtMoment * item.quantitySold, 0
                );

                return (
                    <div key={sale.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                        <h3>Venda #{sale.id}</h3>
                        <p><strong>Data:</strong> {formatDate(sale.date)}</p>
                        <p><strong>Forma de pagamento:</strong> {sale.paymentType}</p>

                        <h4>Itens:</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Produto ID</th>
                                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Quantidade</th>
                                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Preço unitário</th>
                                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.quantitySold}</td>
                                        <td>{formatCurrency(item.priceAtMoment)}</td>
                                        <td>{formatCurrency(item.priceAtMoment * item.quantitySold)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Total da compra: {formatCurrency(totalInCents)}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}


function Layout() {
    const location = useLocation();

    const linkStyle = (path) => ({
        marginRight: '1rem',
        textDecoration: location.pathname === path ? 'underline' : 'none',
    });

    return (
        <div style={{ fontFamily: 'Arial' }}>
            <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                <Link to="/fldesk" style={linkStyle('/')}>Registrar Venda (Código de Barras)</Link>
                <Link to="/fldesk/viewer" style={linkStyle('/viewer')}>Ver Vendas</Link>
            </nav>
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default function FLDesk() {
    const apiBaseUrl = "https://fl-desk.onrender.com"; //"http://localhost:3000";

    const handleSaleCompleted = (result) => {
        console.log('Venda finalizada com sucesso:', result);
        alert('Venda registrada com sucesso!');
    };

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<BarcodeInputSaleComponent apiBaseUrl={apiBaseUrl} onSaleCompleted={handleSaleCompleted} />} />
                <Route path="/viewer" element={<SaleViewerComponent apiBaseUrl={apiBaseUrl} onSaleViewed={() => { }} />} />
            </Route>
        </Routes>
    );
}