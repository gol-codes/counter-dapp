/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import CounterCard from './components/CounterCard.jsx';
import EventLog from './components/EventLog.jsx';
import { counterContract, fetchEvents } from './web3Service.js';
 
export default function App() {
  const [account, setAccount]   = useState(null);
  const [mmWeb3,  setMmWeb3]    = useState(null);
  const [count,   setCount]     = useState('...');
  const [owner,   setOwner]     = useState(null);
  const [stepSize,setStepSize]  = useState('1');
  const [events,  setEvents]    = useState([]);
  const [toast,   setToast]     = useState(null);
 
  const showToast = useCallback((msg, type='info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  }, []);
 
  // Load contract state
  const refresh = useCallback(async () => {
    try {
      const [c, o, s] = await Promise.all([
        counterContract.methods.count().call(),
        counterContract.methods.owner().call(),
        counterContract.methods.stepSize().call(),
      ]);
      setCount(c.toString());
      setOwner(o);
      setStepSize(s.toString());
      const evts = await fetchEvents();
      setEvents(evts.reverse().slice(0, 10));
    } catch (e) {
      showToast('Failed to load contract data: ' + e.message, 'err');
    }
  }, [showToast]);
 
  useEffect(() => { refresh(); }, [refresh]);
 
  const handleConnect = (acc, web3) => {
    setAccount(acc);
    setMmWeb3(web3);
    showToast('Wallet connected!', 'ok');
  };
 
  const isOwner = account && owner &&
    account.toLowerCase() === owner.toLowerCase();
 
  return (
    <div style={{ minHeight:'100vh' }}>
      <Header account={account} onConnect={handleConnect}
              showToast={showToast} />
      <main style={{
        maxWidth:900, margin:'0 auto', padding:'2rem 1.25rem',
        display:'grid', gap:'1.5rem'
      }}>
        <CounterCard
          count={count} stepSize={stepSize}
          account={account} mmWeb3={mmWeb3}
          isOwner={isOwner} onRefresh={refresh}
          showToast={showToast} />
        <EventLog events={events} onRefresh={refresh} />
      </main>
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type==='ok'?'✓ ':toast.type==='err'?'✕ ':'ℹ '}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
