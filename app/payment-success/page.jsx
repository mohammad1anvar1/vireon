'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [state, setState] = useState('loading');
  const [order, setOrder] = useState(null);
  const processed = useRef(false);

  useEffect(() => {
    if (!sessionId || processed.current) return;
    processed.current = true;
    fetch('/api/payment/process-success/payment/process-success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(r => r.json())
      .then(data => { setOrder(data.order); setState('success'); })
      .catch(() => setState('error'));
  }, [sessionId]);

  if (state === 'loading') return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Confirming your payment...</p>
      </div>
    </div>
  );

  if (state === 'error') return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.errorTitle}>Something went wrong</p>
        <p style={styles.muted}>Please contact support@vireonai.uk with your order details.</p>
        <button style={styles.btnSecondary} onClick={() => router.push('/dashboard')}>Go to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logoAccent}>VIREON</span>
          <span style={styles.logoRest}> AI Intelligence</span>
        </div>
        <div style={styles.checkCircle}>✓</div>
        <p style={styles.statusLabel}>PAYMENT CONFIRMED</p>
        <h1 style={styles.title}>Your report is ready.</h1>
        <p style={styles.subtitle}>A copy has been sent to {order?.customerEmail}</p>
        <div style={styles.amountBox}>
          <span style={styles.amount}>£{((order?.amountTotal || 0) / 100).toFixed(2)}</span>
          <span style={styles.amountLabel}> paid</span>
        </div>
        <div style={styles.details}>
          {[
            ['Order', order?.orderNumber],
            ['Product', order?.productName],
            ['Email', order?.customerEmail],
            ['Date', new Date().toLocaleDateString('en-GB')],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.rowKey}>{k}</span>
              <span style={styles.rowVal}>{v}</span>
            </div>
          ))}
        </div>
        <div style={styles.btnRow}>
          <a href={`/api/payment/download-report?session=${sessionId}`} style={styles.btnPrimary}>
            Download Report
          </a>
          <button style={styles.btnSecondary} onClick={() => router.push('/dashboard')}>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight:'100vh', background:'#06060a', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontFamily:'Georgia, serif' },
  card: { background:'#0e0e14', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'40px', width:'100%', maxWidth:'480px', textAlign:'center' },
  header: { marginBottom:'28px' },
  logoAccent: { fontSize:'20px', fontWeight:'bold', color:'#e8ff3c' },
  logoRest: { fontSize:'20px', color:'rgba(255,255,255,0.5)' },
  checkCircle: { width:'56px', height:'56px', borderRadius:'50%', background:'rgba(232,255,60,0.1)', border:'1.5px solid #e8ff3c', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'24px', color:'#e8ff3c' },
  statusLabel: { fontFamily:'monospace', fontSize:'10px', letterSpacing:'0.2em', color:'#3cffa0', textTransform:'uppercase', margin:'0 0 6px' },
  title: { fontSize:'26px', color:'#f0f0e8', margin:'0 0 8px' },
  subtitle: { fontSize:'13px', color:'#6b6b7a', margin:'0 0 24px' },
  amountBox: { background:'rgba(232,255,60,0.08)', border:'1px solid rgba(232,255,60,0.2)', borderRadius:'6px', padding:'16px', marginBottom:'24px' },
  amount: { fontFamily:'monospace', fontSize:'32px', color:'#e8ff3c' },
  amountLabel: { fontSize:'12px', color:'#6b6b7a' },
  details: { textAlign:'left', marginBottom:'28px' },
  row: { display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
  rowKey: { fontFamily:'monospace', fontSize:'10px', color:'#6b6b7a', textTransform:'uppercase', letterSpacing:'0.1em' },
  rowVal: { fontSize:'13px', color:'#f0f0e8' },
  btnRow: { display:'flex', gap:'10px' },
  btnPrimary: { flex:1, background:'#e8ff3c', color:'#0a0a0f', padding:'13px', borderRadius:'5px', fontWeight:'bold', fontSize:'13px', textDecoration:'none', textAlign:'center' },
  btnSecondary: { flex:1, background:'transparent', color:'#f0f0e8', padding:'13px', borderRadius:'5px', border:'1px solid rgba(255,255,255,0.07)', fontSize:'13px', cursor:'pointer' },
  spinner: { width:'36px', height:'36px', border:'2px solid rgba(255,255,255,0.1)', borderTopColor:'#e8ff3c', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' },
  loadingText: { color:'#6b6b7a', fontFamily:'monospace', fontSize:'12px' },
  errorTitle: { fontSize:'22px', color:'#f0f0e8', marginBottom:'8px' },
  muted: { color:'#6b6b7a', fontSize:'14px', marginBottom:'24px' },
};
