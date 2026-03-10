export default function EventLog({ events, onRefresh }) {
  return (
    <div className='card'>
      <div style={{display:'flex',justifyContent:'space-between',
        alignItems:'center',marginBottom:'1rem'}}>
        <h2 style={{fontWeight:700,fontSize:'1rem'}}>
          Recent Increment Events
        </h2>
        <button className='btn-secondary'
          style={{fontSize:'.75rem',padding:'.3rem .75rem'}}
          onClick={onRefresh}>↻ Refresh
        </button>
      </div>
 
      {events.length === 0 ? (
        <p style={{color:'var(--text2)',fontSize:'.85rem',textAlign:'center',
          padding:'2rem 0'}}>
          No events yet. Increment the counter to see activity.
        </p>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
          {events.map((e, i) => (
            <div key={i} style={{
              display:'flex',justifyContent:'space-between',
              alignItems:'center',padding:'.6rem .75rem',
              background:'var(--bg3)',borderRadius:6,
              flexWrap:'wrap',gap:'.5rem',
            }}>
              <div>
                <span style={{
                  fontFamily:'var(--mono)',fontSize:'1rem',
                  fontWeight:700,color:'var(--accent)',
                }}>
                  {e.newCount}
                </span>
                <span style={{color:'var(--text2)',
                  fontSize:'.72rem',marginLeft:'.5rem'}}>
                  block #{e.block}
                </span>
              </div>
              <span className='mono' style={{fontSize:'.7rem'}}>
                {e.by.slice(0,8)}…{e.by.slice(-6)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
