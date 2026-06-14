'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logoAccent}>VIREON</span>
          <span style={styles.logoRest}> AI</span>
        </div>

        <p style={styles.statusLabel}>CUSTOMER DASHBOARD</p>
        <h1 style={styles.title}>Your property intelligence hub.</h1>
        <p style={styles.subtitle}>
          Purchased reports and analysis updates will appear here. If you have just completed checkout,
          use the download link on your payment confirmation page or check your email for your order details.
        </p>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Recent activity</h2>
          <p style={styles.panelText}>
            No dashboard activity is available yet. New report purchases are stored securely and linked to
            the Stripe checkout session used during payment.
          </p>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.btnPrimary} onClick={() => router.push('/pricing')}>
            Buy a Report
          </button>
          <button style={styles.btnSecondary} onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#06060a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Georgia,serif',
  },
  card: {
    background: '#0e0e14',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    padding: '40px',
    width: '100%',
    maxWidth: '640px',
  },
  header: { marginBottom: '28px', textAlign: 'center' },
  logoAccent: { fontSize: '20px', fontWeight: 'bold', color: '#e8ff3c' },
  logoRest: { fontSize: '20px', color: 'rgba(255,255,255,0.5)' },
  statusLabel: {
    fontFamily: 'monospace',
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: '#3cffa0',
    textTransform: 'uppercase',
    margin: '0 0 8px',
    textAlign: 'center',
  },
  title: {
    fontSize: '30px',
    color: '#f0f0e8',
    margin: '0 0 12px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#8a8a98',
    lineHeight: 1.7,
    margin: '0 0 28px',
    textAlign: 'center',
  },
  panel: {
    background: 'rgba(232,255,60,0.08)',
    border: '1px solid rgba(232,255,60,0.2)',
    borderRadius: '6px',
    padding: '22px',
    marginBottom: '28px',
  },
  panelTitle: {
    color: '#e8ff3c',
    fontSize: '16px',
    margin: '0 0 8px',
  },
  panelText: {
    color: '#c8c8d0',
    fontSize: '13px',
    lineHeight: 1.7,
    margin: 0,
  },
  btnRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btnPrimary: {
    flex: 1,
    minWidth: '180px',
    background: '#e8ff3c',
    color: '#0a0a0f',
    padding: '13px',
    borderRadius: '5px',
    border: 0,
    fontWeight: 'bold',
    fontSize: '13px',
    cursor: 'pointer',
  },
  btnSecondary: {
    flex: 1,
    minWidth: '180px',
    background: 'transparent',
    color: '#f0f0e8',
    padding: '13px',
    borderRadius: '5px',
    border: '1px solid rgba(255,255,255,0.07)',
    fontSize: '13px',
    cursor: 'pointer',
  },
};
