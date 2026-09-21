import React, { useState, useEffect, useRef } from "react";

const DEFAULT_PLAYERS = [
  "Garza", "Herny", "Gonzalo G", "Gonzalo Caché",
  "Tanque", "Tommy", "Mafa", "Tingui",
  "Maxi", "Grazu", "Guille", "Lele",
  "Metra", "Marito", "Xavier", "Jugador X",
  "Luis", "Alberto"
];

const ROUNDS = [1, 2, 3, 4, 5, 6];
const STORAGE_KEY = "golf_torneo_v4";

const LOGO_SA = "data:image/png;base64,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";

const GAS_URL = "https://script.google.com/macros/s/AKfycbx8zgst5L8Pv66avrxJP_K03KNMo2akqYFufx3bfX3M2Vg8VJDNlNbxY_ZMb6MfzzZP/exec";

const gasRead = async () => {
  try {
    const r = await fetch(GAS_URL, { redirect: "follow" });
    return await r.json();
  } catch { return {}; }
};

const gasWrite = async (key, value) => {
  try {
    await fetch(GAS_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ key, value }),
    });
  } catch {}
};

const POINTS_TABLE = [16, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0];
const POINTS_TABLE_DOUBLE = POINTS_TABLE.map(p => p * 2);

const getPointsForRank = (rank, round) => {
  if (rank === null) return null;
  const table = round === 6 ? POINTS_TABLE_DOUBLE : POINTS_TABLE;
  return table[rank - 1] ?? 0;
};

const formatPts = (pts) => {
  if (pts === null) return null;
  return Number.isInteger(pts) ? pts : pts.toFixed(1);
};

const loadState = () => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
};

const saveState = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};

const getMedal = (pos) => {
  if (pos === 0) return "🥇";
  if (pos === 1) return "🥈";
  if (pos === 2) return "🥉";
  return null;
};

const ordinal = (n) => `${n}°`;

const rankColor = (rank) => {
  if (rank === 1) return "#f0d060";
  if (rank === 2) return "#c0c0c0";
  if (rank === 3) return "#cd7f32";
  if (rank <= 5) return "#6ab832";
  if (rank <= 8) return "#a0c878";
  if (rank <= 14) return "#5a7a5a";
  return "#3a4a3a";
};

// ─── Handicap logic ───────────────────────────────────────────────
// Returns { avg, above: [names], below: [names] } for a given round
const getDayAvgStats = (players, scores, round) => {
  const played = players
    .map(p => {
      const v = scores[`${p}_${round}`];
      return v !== undefined && v !== "" ? { name: p, score: Number(v) } : null;
    })
    .filter(Boolean);
  if (played.length === 0) return null;
  const avg = played.reduce((s, x) => s + x.score, 0) / played.length;
  const above = played.filter(x => x.score >= avg + 3).map(x => x.name);
  const below = played.filter(x => x.score <= avg - 3).map(x => x.name);
  return { avg, above, below };
};

// Compute handicap table: hdcpTable[player][round] = hcp for that round
const computeHandicaps = (players, scores, baseHdcp) => {
  const table = {};
  players.forEach(p => { table[p] = {}; });

  ROUNDS.forEach((r, idx) => {
    players.forEach(p => {
      if (idx === 0) {
        // Day 1: use base handicap (editable)
        table[p][r] = baseHdcp[p] !== undefined ? baseHdcp[p] : 0;
      } else {
        const prevRound = ROUNDS[idx - 1];
        const prevHcp = table[p][prevRound] ?? 0;
        const stats = getDayAvgStats(players, scores, prevRound);
        if (!stats) {
          table[p][r] = prevHcp;
        } else if (stats.above.includes(p)) {
          table[p][r] = Math.max(0, prevHcp - 1);
        } else if (stats.below.includes(p)) {
          table[p][r] = prevHcp + 1;
        } else {
          table[p][r] = prevHcp;
        }
      }
    });
  });
  return table;
};

export default function GolfTorneo() {
  const saved = loadState();
  const [players, setPlayers] = useState(saved?.players || DEFAULT_PLAYERS);
  const [scores, setScores] = useState(saved?.scores || {});
  const [activeRound, setActiveRound] = useState(saved?.activeRound || 1);
  const [view, setView] = useState("leaderboard");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editName, setEditName] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [tournamentName, setTournamentName] = useState(saved?.tournamentName || "Torneo de Golf");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [lastSync, setLastSync] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  // baseHdcp: { [playerName]: number } — handicap inicial día 1
  const [baseHdcp, setBaseHdcp] = useState(saved?.baseHdcp || {});
  const lastWriteRef = useRef(0);

  // ── Save to GAS + localStorage whenever state changes ─────────────
  useEffect(() => {
    if (loadingData) return;
    const data = { players, scores, activeRound, tournamentName, baseHdcp };
    saveState(data);
    lastWriteRef.current = Date.now();
    gasWrite(STORAGE_KEY, JSON.stringify(data));
  }, [players, scores, activeRound, tournamentName, baseHdcp, loadingData]);

  // ── Load from GAS on mount + poll every 10s ───────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const all = await gasRead();
        if (all[STORAGE_KEY]) {
          const d = JSON.parse(all[STORAGE_KEY]);
          if (d.players) setPlayers(d.players);
          if (d.scores) setScores(d.scores);
          if (d.activeRound) setActiveRound(d.activeRound);
          if (d.tournamentName) setTournamentName(d.tournamentName);
          if (d.baseHdcp) setBaseHdcp(d.baseHdcp);
        }
      } catch {}
      setLoadingData(false);
    };
    load();
    const iv = setInterval(async () => {
      if (Date.now() - lastWriteRef.current < 15000) return;
      try {
        const all = await gasRead();
        if (all[STORAGE_KEY]) {
          const d = JSON.parse(all[STORAGE_KEY]);
          if (d.scores) setScores(d.scores);
          if (d.players) setPlayers(d.players);
          if (d.tournamentName) setTournamentName(d.tournamentName);
          if (d.baseHdcp) setBaseHdcp(d.baseHdcp);
        }
        setLastSync(new Date().toLocaleTimeString("es-AR"));
      } catch {}
    }, 10000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const init = {};
    players.forEach(p => {
      ROUNDS.forEach(r => {
        const key = `${p}_${r}`;
        init[key] = scores[key] !== undefined ? String(scores[key]) : "";
      });
    });
    setInputValues(init);
  }, [players]);

  // ── Score helpers ──────────────────────────────────────────────────
  const getRoundScore = (player, round) => {
    const v = scores[`${player}_${round}`];
    return v !== undefined && v !== "" ? Number(v) : null;
  };

  const getDayRank = (player, round) => {
    const sc = getRoundScore(player, round);
    if (sc === null) return null;
    const allScores = players
      .map(p => getRoundScore(p, round))
      .filter(s => s !== null)
      .sort((a, b) => b - a);
    return allScores.indexOf(sc) + 1;
  };

  const getDayPoints = (player, round) => {
    const sc = getRoundScore(player, round);
    if (sc === null) return null;
    const allScores = players
      .map(p => getRoundScore(p, round))
      .filter(s => s !== null)
      .sort((a, b) => b - a);
    const startRank = allScores.indexOf(sc) + 1;
    const tiedCount = allScores.filter(s => s === sc).length;
    let totalPts = 0;
    for (let i = 0; i < tiedCount; i++) {
      totalPts += getPointsForRank(startRank + i, round);
    }
    return totalPts / tiedCount;
  };

  const getTotalPoints = (player) =>
    ROUNDS.reduce((sum, r) => {
      const pts = getDayPoints(player, r);
      return sum + (pts !== null ? pts : 0);
    }, 0);

  const getDayStats = (round) => {
    const played = players
      .map(p => ({ name: p, score: getRoundScore(p, round) }))
      .filter(x => x.score !== null && x.score > 0);
    if (played.length === 0) return null;
    const sum = played.reduce((acc, x) => acc + x.score, 0);
    const avg = sum / played.length;
    const above = played.filter(x => x.score >= avg + 3).sort((a, b) => b.score - a.score);
    const below = played.filter(x => x.score <= avg - 3).sort((a, b) => a.score - b.score);
    return { avg, above, below, count: played.length };
  };

  const leaderboard = [...players]
    .map(p => ({ name: p, total: getTotalPoints(p) }))
    .sort((a, b) => b.total - a.total);

  const handleScoreInput = (player, round, value) => {
    const key = `${player}_${round}`;
    setInputValues(prev => ({ ...prev, [key]: value }));
    const num = value === "" ? undefined : Number(value);
    setScores(prev => {
      const next = { ...prev };
      if (num === undefined || isNaN(num)) delete next[key];
      else next[key] = num;
      return next;
    });
  };

  const handlePlayerEdit = (idx) => {
    setEditingPlayer(idx);
    setEditName(players[idx]);
  };

  const confirmPlayerEdit = (idx) => {
    if (editName.trim()) {
      const oldName = players[idx];
      const newName = editName.trim();
      setPlayers(prev => {
        const next = [...prev];
        next[idx] = newName;
        return next;
      });
      const newScores = {};
      Object.entries(scores).forEach(([k, v]) => {
        newScores[k.replace(`${oldName}_`, `${newName}_`)] = v;
      });
      setScores(newScores);
      // migrate baseHdcp key
      setBaseHdcp(prev => {
        const next = { ...prev };
        if (next[oldName] !== undefined) {
          next[newName] = next[oldName];
          delete next[oldName];
        }
        return next;
      });
    }
    setEditingPlayer(null);
  };

  const handleBaseHdcp = (player, value) => {
    const num = value === "" ? 0 : parseInt(value, 10);
    setBaseHdcp(prev => ({ ...prev, [player]: isNaN(num) ? 0 : num }));
  };

  const hdcpTable = computeHandicaps(players, scores, baseHdcp);

  const [pdfStatus, setPdfStatus] = useState("");

  const exportHTML = () => {
    setPdfStatus("Generando...");
    const rows = [...players]
      .map(p => ({ name: p, total: getTotalPoints(p) }))
      .sort((a, b) => b.total - a.total);

    const dayHeaders = ROUNDS.map(r =>
      `<th colspan="2" style="border-left:3px solid #2a7a2a;background:#1a5a1a;color:#fff;padding:6px 4px;font-size:12px;text-align:center">Día ${r}<br/><span style="font-size:9px;opacity:0.8">score | pts</span></th>`
    ).join('');

    const bodyRows = rows.map((entry, idx) => {
      const isLeader = idx === 0;
      const bg = isLeader ? "#fffbe6" : idx % 2 === 0 ? "#f4faf2" : "#ffffff";
      const dayCells = ROUNDS.map(r => {
        const v = scores[`${entry.name}_${r}`];
        const sc = v !== undefined && v !== "" ? Number(v) : null;
        const all = players.map(x => { const vx = scores[`${x}_${r}`]; return vx !== undefined && vx !== "" ? Number(vx) : null; }).filter(s => s !== null).sort((a,b)=>b-a);
        const rank = sc === null ? null : all.indexOf(sc) + 1;
        const tbl = r === 6 ? POINTS_TABLE_DOUBLE : POINTS_TABLE;
        let pts = null;
        if (rank !== null) {
          const cnt = all.filter(s => s === sc).length;
          let t = 0; for (let i = 0; i < cnt; i++) t += (tbl[rank-1+i] ?? 0);
          pts = t/cnt;
        }
        const scStr = sc === null ? "—" : sc;
        const ptsStr = pts === null ? "—" : (Number.isInteger(pts) ? pts : pts.toFixed(1));
        const ptsColor = pts === null ? "#aaa" : pts >= 14 ? "#b8860b" : pts >= 8 ? "#1a6a1a" : "#555";
        return `<td style="border-left:3px solid #2a7a2a;text-align:center;padding:5px 3px;font-size:13px;color:#333">${scStr}</td><td style="text-align:center;padding:5px 3px;font-size:13px;font-weight:bold;color:${ptsColor}">${ptsStr}</td>`;
      }).join('');
      const totalStr = Number.isInteger(entry.total) ? entry.total : entry.total.toFixed(1);
      return `<tr style="background:${bg}">
        <td style="text-align:center;padding:6px 4px;font-size:13px;color:#555">${idx+1}</td>
        <td style="padding:6px 6px;font-size:14px;font-weight:${isLeader?"bold":"normal"};color:${isLeader?"#7a5a00":"#222"}">${isLeader?"🏆 ":""}${entry.name}</td>
        <td style="text-align:center;padding:6px 4px;font-size:15px;font-weight:bold;color:${isLeader?"#b8860b":"#1a5a1a"};border-left:3px solid #2a7a2a">${totalStr}</td>
        ${dayCells}
      </tr>`;
    }).join('');

    const dateStr = new Date().toLocaleDateString("es-AR");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${tournamentName}</title>
<style>body{font-family:Arial,sans-serif;margin:20px}h1{color:#1a5a1a}table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #ddd}</style>
</head><body><h1>⛳ ${tournamentName}</h1><p>${dateStr}</p><table><thead><tr>
<th style="background:#1a5a1a;color:#fff">#</th><th style="text-align:left;background:#1a5a1a;color:#fff">Jugador</th>
<th style="background:#1a5a1a;color:#fff;border-left:3px solid #4aaa4a">Total</th>${dayHeaders}</tr></thead>
<tbody>${bodyRows}</tbody></table></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "torneo_resultados.html";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setPdfStatus("✓ Descargado");
    setTimeout(() => setPdfStatus(""), 3000);
  };

  const completedRounds = ROUNDS.filter(r =>
    players.some(p => scores[`${p}_${r}`] !== undefined)
  );

  const roundLeader = (round) => {
    let best = null, bestScore = -Infinity;
    players.forEach(p => {
      const s = getRoundScore(p, round);
      if (s !== null && s > bestScore) { bestScore = s; best = p; }
    });
    return best;
  };

  if (loadingData) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a1628 0%,#0f2744 40%,#0a1a0a 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,fontFamily:"Georgia,serif"}}>
      <div style={{color:"#6ab832",fontSize:20}}>⛳ Cargando torneo...</div>
      <div style={{color:"#4a7a3a",fontSize:12}}>Conectando con Google Sheets...</div>
    </div>
  );

  // ─── Styles ────────────────────────────────────────────────────────
  const statBox = {
    flex:"1 1 140px", background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(106,184,50,0.15)", borderRadius:10, padding:"10px 14px",
  };
  const statLabel = { fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#4a8a2a", marginBottom:4 };
  const statVal = { fontSize:17, fontWeight:"bold", color:"#e8d5a3" };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#0a1628 0%,#0f2744 40%,#0a1a0a 100%)",
      fontFamily:"'Georgia',serif",
      color:"#e8d5a3",
    }}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(90deg,#0a2a0a,#1a4a1a,#0a2a0a)",
        borderBottom:"2px solid #4a8a2a",
        padding:"20px 24px 16px",
        position:"sticky", top:0, zIndex:10,
      }}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          {editingTitle ? (
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={titleInput} onChange={e=>setTitleInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"){setTournamentName(titleInput||tournamentName);setEditingTitle(false);}}}
                style={{fontSize:22,fontWeight:"bold",background:"rgba(255,255,255,0.1)",border:"1px solid #4a8a2a",borderRadius:6,color:"#e8d5a3",padding:"4px 10px",flex:1,fontFamily:"Georgia,serif"}}
                autoFocus/>
              <button onClick={()=>{setTournamentName(titleInput||tournamentName);setEditingTitle(false);}}
                style={{background:"#2a6a1a",border:"none",borderRadius:6,color:"#e8d5a3",padding:"6px 14px",cursor:"pointer",fontSize:14}}>✓</button>
            </div>
          ) : (
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>{setTitleInput(tournamentName);setEditingTitle(true);}}>
              <span style={{fontSize:28}}>⛳</span>
              <h1 style={{margin:0,fontSize:22,fontWeight:"bold",color:"#e8d5a3",letterSpacing:1}}>{tournamentName}</h1>
              <span style={{fontSize:11,color:"#6ab832",opacity:0.7}}>✎</span>
            </div>
          )}
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#6ab832"}}/>
            <span style={{fontSize:10,color:"#6ab832"}}>{lastSync?`Act. ${lastSync}`:"Conectado · Google Sheets"}</span>
          </div>
          <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
            {[
              {id:"leaderboard",label:"🏆 Tabla"},
              {id:"cargar",label:"✏️ Scores"},
              {id:"handicaps",label:"🎯 Hándicaps"},
              {id:"jugadores",label:"👥 Jugadores"},
            ].map(v=>(
              <button key={v.id} onClick={()=>setView(v.id)} style={{
                padding:"6px 16px",borderRadius:20,fontSize:12,fontWeight:"bold",
                letterSpacing:1,textTransform:"uppercase",cursor:"pointer",
                border:view===v.id?"2px solid #6ab832":"2px solid rgba(106,184,50,0.3)",
                background:view===v.id?"#2a6a1a":"transparent",
                color:view===v.id?"#e8f5d0":"#a0c878",
                transition:"all 0.2s",
              }}>{v.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"20px 16px"}}>

        {/* ═══ LEADERBOARD ═══════════════════════════════════════════ */}
        {view==="leaderboard"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#6ab832",letterSpacing:2,textTransform:"uppercase",marginRight:4}}>Día activo:</span>
              {ROUNDS.map(r=>(
                <button key={r} onClick={()=>setActiveRound(r)} style={{
                  width:36,height:36,borderRadius:"50%",
                  border:activeRound===r?"2px solid #6ab832":"2px solid rgba(106,184,50,0.3)",
                  background:activeRound===r?"#2a6a1a":completedRounds.includes(r)?"rgba(42,106,26,0.3)":"transparent",
                  color:activeRound===r?"#e8f5d0":completedRounds.includes(r)?"#a0c878":"#4a7a3a",
                  fontWeight:"bold",fontSize:14,cursor:"pointer",
                }}>{r}</button>
              ))}
            </div>

            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
              <button onClick={exportHTML} style={{
                display:"flex",alignItems:"center",gap:6,
                padding:"8px 18px",borderRadius:20,fontSize:13,fontWeight:"bold",
                cursor:"pointer",letterSpacing:1,
                background:"linear-gradient(90deg,#1a4a1a,#2a6a2a)",
                border:"2px solid #6ab832",color:"#e8f5d0",
                boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
              }}>📄 {pdfStatus||"Compartir tabla"}</button>
            </div>

            <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
              <div style={statBox}><div style={statLabel}>Días jugados</div><div style={statVal}>{completedRounds.length} / 6</div></div>
              <div style={statBox}><div style={statLabel}>Líder del torneo</div><div style={{...statVal,color:"#f0d060"}}>{leaderboard[0]?.name||"—"}</div></div>
              <div style={statBox}><div style={statLabel}>Ganador día {activeRound}</div><div style={{...statVal,color:"#6ab832"}}>{roundLeader(activeRound)||"—"}</div></div>
            </div>

            <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(106,184,50,0.2)",overflowX:"auto"}}>
              <div style={{
                display:"grid",
                gridTemplateColumns:"32px minmax(100px,1fr) 48px repeat(6,34px 34px)",
                background:"rgba(42,106,26,0.5)",padding:"8px 6px",
                fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#6ab832",fontWeight:"bold",
                gap:0,borderBottom:"1px solid rgba(106,184,50,0.3)",minWidth:620,
              }}>
                <div style={{textAlign:"center"}}>#</div>
                <div style={{paddingLeft:6}}>Jugador</div>
                <div style={{textAlign:"center",borderRight:"3px solid #4a8a2a",paddingRight:4}}>Tot</div>
                {ROUNDS.map(r=>(
                  <div key={r} style={{gridColumn:"span 2",textAlign:"center",color:activeRound===r?"#f0d060":"#6ab832",borderLeft:"3px solid #4a8a2a",paddingBottom:2}}>
                    <div>Día {r}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",fontSize:9,opacity:0.7,marginTop:2}}>
                      <span style={{textAlign:"center"}}>sc</span><span style={{textAlign:"center"}}>pts</span>
                    </div>
                  </div>
                ))}
              </div>

              {leaderboard.map((entry,idx)=>{
                const isLeader=idx===0;
                const medal=getMedal(idx);
                return(
                  <div key={entry.name} style={{
                    display:"grid",
                    gridTemplateColumns:"32px minmax(100px,1fr) 48px repeat(6,34px 34px)",
                    padding:"8px 6px",gap:0,alignItems:"center",
                    background:isLeader?"rgba(42,106,26,0.25)":idx%2===0?"rgba(255,255,255,0.02)":"transparent",
                    borderBottom:"1px solid rgba(106,184,50,0.08)",minWidth:620,
                  }}>
                    <div style={{fontSize:13,textAlign:"center",color:isLeader?"#f0d060":"#6ab832"}}>
                      {medal||<span style={{color:"#4a6a3a",fontSize:12}}>{idx+1}</span>}
                    </div>
                    <div style={{fontSize:15,color:isLeader?"#f0f0d0":"#d0c090",fontWeight:isLeader?"bold":"normal",paddingLeft:6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {entry.name}
                    </div>
                    <div style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:isLeader?"#f0d060":"#e8d5a3",fontVariantNumeric:"tabular-nums",borderRight:"3px solid #4a8a2a"}}>
                      {formatPts(entry.total)}
                    </div>
                    {ROUNDS.map(r=>{
                      const sc=getRoundScore(entry.name,r);
                      const rank=getDayRank(entry.name,r);
                      const pts=getDayPoints(entry.name,r);
                      const isActive=r===activeRound;
                      const ptsColor=pts===null?"#2a4a2a":pts>=14?"#f0d060":pts>=10?"#a0d060":pts>=6?"#a0c878":pts>0?"#6a8a6a":"#3a5a3a";
                      const scColor=sc===null?"#2a4a2a":rank===1?"#f0d060":"#7ab050";
                      const dayBg=isActive?"rgba(240,208,96,0.08)":r%2===0?"rgba(255,255,255,0.02)":"transparent";
                      return[
                        <div key={r+"_sc"} style={{textAlign:"center",fontSize:15,fontVariantNumeric:"tabular-nums",color:scColor,background:dayBg,borderLeft:"3px solid #4a8a2a",padding:"2px 2px",fontWeight:rank===1&&sc!==null?"bold":"normal"}}>
                          {sc===null?<span style={{color:"#2a4a2a"}}>·</span>:sc}
                        </div>,
                        <div key={r+"_pts"} style={{textAlign:"center",fontSize:15,fontVariantNumeric:"tabular-nums",color:ptsColor,background:dayBg,borderLeft:"1px solid rgba(106,184,50,0.25)",fontWeight:"bold",padding:"2px 0"}}>
                          {pts===null?<span style={{color:"#2a4a2a"}}>·</span>:formatPts(pts)}
                        </div>
                      ];
                    })}
                  </div>
                );
              })}
            </div>

            {/* Bar chart */}
            <div style={{marginTop:24}}>
              <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#6ab832",marginBottom:12}}>Puntos acumulados</div>
              {leaderboard.slice(0,8).map((entry,idx)=>{
                const maxPts=leaderboard[0]?.total||1;
                const pct=maxPts>0?(entry.total/maxPts)*100:0;
                return(
                  <div key={entry.name} style={{marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:20,fontSize:11,color:"#4a7a3a",textAlign:"right"}}>{idx+1}</div>
                    <div style={{width:90,fontSize:13,color:"#c0a860",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{entry.name}</div>
                    <div style={{flex:1,height:16,background:"rgba(255,255,255,0.05)",borderRadius:8,overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:8,width:`${pct}%`,background:idx===0?"linear-gradient(90deg,#4a8a1a,#8ad030)":"linear-gradient(90deg,#2a5a0a,#4a8a2a)",transition:"width 0.5s ease"}}/>
                    </div>
                    <div style={{width:30,textAlign:"right",fontWeight:"bold",fontSize:14,color:idx===0?"#f0d060":"#a0c878"}}>{entry.total}</div>
                  </div>
                );
              })}
            </div>

            {/* Points table */}
            <div style={{marginTop:20,padding:"12px 16px",background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(106,184,50,0.1)"}}>
              <div style={{fontSize:11,color:"#6ab832",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Tabla de puntos</div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#4a8a2a",marginBottom:6,letterSpacing:1}}>DÍAS 1–5</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {POINTS_TABLE.filter((_,i)=>i<16).map((pts,i)=>(
                      <div key={i} style={{fontSize:11,background:"rgba(42,106,26,0.2)",borderRadius:6,padding:"3px 8px",color:pts>=14?"#f0d060":pts>=10?"#a0d060":pts>=6?"#a0c878":"#5a7a5a",fontVariantNumeric:"tabular-nums"}}>
                        {ordinal(i+1)} → {pts}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#f0d060",marginBottom:6,letterSpacing:1}}>DÍA 6 ×2</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {POINTS_TABLE_DOUBLE.filter((_,i)=>i<16).map((pts,i)=>(
                      <div key={i} style={{fontSize:11,background:"rgba(106,84,0,0.25)",borderRadius:6,padding:"3px 8px",color:pts>=28?"#f0d060":pts>=20?"#a0d060":pts>=12?"#a0c878":"#5a7a5a",fontVariantNumeric:"tabular-nums"}}>
                        {ordinal(i+1)} → {pts}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CARGAR SCORES ══════════════════════════════════════════ */}
        {view==="cargar"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#6ab832",letterSpacing:2,textTransform:"uppercase"}}>Día:</span>
              {ROUNDS.map(r=>(
                <button key={r} onClick={()=>setActiveRound(r)} style={{
                  width:40,height:40,borderRadius:"50%",
                  border:activeRound===r?"2px solid #6ab832":"2px solid rgba(106,184,50,0.3)",
                  background:activeRound===r?"#2a6a1a":"transparent",
                  color:activeRound===r?"#e8f5d0":"#6ab832",
                  fontWeight:"bold",fontSize:15,cursor:"pointer",
                }}>{r}</button>
              ))}
            </div>
            <div style={{fontSize:12,color:"#6ab832",letterSpacing:1,marginBottom:12}}>
              Día {activeRound} · Ingresá el score de cada jugador
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
              {players.map(p=>{
                const key=`${p}_${activeRound}`;
                const val=inputValues[key]??(scores[key]!==undefined?String(scores[key]):"");
                const rank=getDayRank(p,activeRound);
                const pts=getDayPoints(p,activeRound);
                const hcp=hdcpTable[p]?.[activeRound];
                return(
                  <div key={p} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(106,184,50,0.15)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,color:"#c0a860",fontWeight:"bold"}}>{p}</div>
                        <div style={{fontSize:10,color:"#4a8a2a"}}>Hcp día {activeRound}: <span style={{color:"#a0d060",fontWeight:"bold"}}>{hcp??0}</span></div>
                      </div>
                      {rank!==null&&(
                        <div style={{display:"flex",gap:4,alignItems:"center"}}>
                          <span style={{fontSize:11,color:rankColor(rank),fontWeight:"bold"}}>{ordinal(rank)}</span>
                          <span style={{fontSize:11,color:"#6ab832"}}>+{formatPts(pts)}pts</span>
                        </div>
                      )}
                    </div>
                    <input type="number" inputMode="numeric" placeholder="score" value={val}
                      onChange={e=>handleScoreInput(p,activeRound,e.target.value)}
                      style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(106,184,50,0.3)",borderRadius:6,color:"#e8d5a3",fontSize:20,fontWeight:"bold",padding:"6px 10px",width:"100%",boxSizing:"border-box",fontFamily:"Georgia,serif",textAlign:"center",outline:"none"}}/>
                  </div>
                );
              })}
            </div>

            {/* Day ranking + stats */}
            <div style={{marginTop:20,padding:"12px 16px",background:"rgba(42,106,26,0.2)",borderRadius:10,border:"1px solid rgba(106,184,50,0.2)"}}>
              <div style={{fontSize:12,color:"#6ab832",letterSpacing:1,marginBottom:10}}>Ranking Día {activeRound}</div>
              <div style={{display:"grid",gridTemplateColumns:"28px 1fr 50px 50px",gap:0,marginBottom:6}}>
                {["Pos","Jugador","Score","Pts"].map(h=>(
                  <div key={h} style={{fontSize:10,color:"#4a7a3a",textTransform:"uppercase",letterSpacing:1,textAlign:h==="Jugador"?"left":"center"}}>{h}</div>
                ))}
              </div>
              {[...players].map(p=>({name:p,sc:getRoundScore(p,activeRound)})).filter(x=>x.sc!==null).sort((a,b)=>b.sc-a.sc)
                .map((x,i)=>{
                  const rank=i+1;
                  const pts=getPointsForRank(rank,activeRound);
                  return(
                    <div key={x.name} style={{display:"grid",gridTemplateColumns:"28px 1fr 50px 50px",alignItems:"center",marginBottom:5}}>
                      <span style={{color:rankColor(rank),fontWeight:"bold",fontSize:13}}>{ordinal(rank)}</span>
                      <span style={{color:rank===1?"#f0d060":"#a0c878",fontSize:13}}>{rank===1?"🏆 ":""}{x.name}</span>
                      <span style={{textAlign:"center",color:"#a0c878",fontSize:13}}>{x.sc}</span>
                      <span style={{textAlign:"center",fontWeight:"bold",color:pts>=14?"#f0d060":pts>=10?"#a0d060":"#6ab832",fontSize:13}}>{formatPts(pts)}</span>
                    </div>
                  );
                })}

              {(()=>{
                const stats=getDayStats(activeRound);
                if(!stats)return null;
                const avgStr=Number.isInteger(stats.avg)?stats.avg:stats.avg.toFixed(1);
                return(
                  <div style={{marginTop:16,borderTop:"1px solid rgba(106,184,50,0.2)",paddingTop:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                      <div style={{fontSize:11,color:"#6ab832",textTransform:"uppercase",letterSpacing:1}}>Promedio día {activeRound}</div>
                      <div style={{fontSize:22,fontWeight:"bold",color:"#e8d5a3"}}>{avgStr}</div>
                      <div style={{fontSize:11,color:"#4a7a3a"}}>pts · {stats.count} jugadores</div>
                    </div>
                    {stats.above.length>0&&(
                      <div style={{marginBottom:12}}>
                        <div style={{fontSize:11,color:"#6ab832",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>⬆ Por encima (+3 o más) → hcp baja 1</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {stats.above.map(x=>{
                            const diff=x.score-stats.avg;
                            return(
                              <div key={x.name} style={{background:"rgba(106,184,50,0.15)",border:"1px solid rgba(106,184,50,0.4)",borderRadius:8,padding:"6px 12px",display:"flex",alignItems:"center",gap:8}}>
                                <span style={{fontSize:13,color:"#c0a860",fontWeight:"bold"}}>{x.name}</span>
                                <span style={{fontSize:14,fontWeight:"bold",color:"#a0d060"}}>{x.score}</span>
                                <span style={{fontSize:11,color:"#6ab832"}}>{diff>=0?`+${diff.toFixed(1)}`:diff.toFixed(1)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {stats.below.length>0&&(
                      <div>
                        <div style={{fontSize:11,color:"#e06060",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>⬇ Por debajo (-3 o más) → hcp sube 1</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {stats.below.map(x=>{
                            const diff=x.score-stats.avg;
                            return(
                              <div key={x.name} style={{background:"rgba(200,60,60,0.1)",border:"1px solid rgba(200,60,60,0.3)",borderRadius:8,padding:"6px 12px",display:"flex",alignItems:"center",gap:8}}>
                                <span style={{fontSize:13,color:"#c0a860",fontWeight:"bold"}}>{x.name}</span>
                                <span style={{fontSize:14,fontWeight:"bold",color:"#f08080"}}>{x.score}</span>
                                <span style={{fontSize:11,color:"#e06060"}}>{diff>=0?`+${diff.toFixed(1)}`:diff.toFixed(1)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {stats.above.length===0&&stats.below.length===0&&(
                      <div style={{fontSize:12,color:"#4a7a3a"}}>Todos dentro del rango ±3 del promedio.</div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ═══ HÁNDICAPS ══════════════════════════════════════════════ */}
        {view==="handicaps"&&(
          <div>
            <div style={{fontSize:13,color:"#a0c878",marginBottom:6,lineHeight:1.5}}>
              Ingresá el <strong style={{color:"#f0d060"}}>hándicap inicial (Día 1)</strong> de cada jugador.<br/>
              Los días siguientes se calculan automáticamente según el promedio de cada jornada.
            </div>
            <div style={{fontSize:11,color:"#4a8a2a",marginBottom:20,padding:"8px 12px",background:"rgba(255,255,255,0.03)",borderRadius:8,border:"1px solid rgba(106,184,50,0.1)"}}>
              ⬆ Sobre el promedio (+3 o más) → hcp baja 1 el día siguiente &nbsp;|&nbsp; ⬇ Bajo el promedio (-3 o más) → hcp sube 1
            </div>

            <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(106,184,50,0.2)",overflowX:"auto"}}>
              {/* Header */}
              <div style={{display:"grid",gridTemplateColumns:"minmax(100px,1fr) repeat(6,60px)",background:"rgba(42,106,26,0.5)",padding:"10px 12px",fontSize:11,letterSpacing:1,textTransform:"uppercase",color:"#6ab832",fontWeight:"bold",gap:0,borderBottom:"1px solid rgba(106,184,50,0.3)",minWidth:460}}>
                <div>Jugador</div>
                {ROUNDS.map(r=>(
                  <div key={r} style={{textAlign:"center",color:r===1?"#f0d060":"#6ab832"}}>Día {r}</div>
                ))}
              </div>

              {players.map((p,idx)=>{
                return(
                  <div key={p} style={{display:"grid",gridTemplateColumns:"minmax(100px,1fr) repeat(6,60px)",padding:"8px 12px",gap:0,alignItems:"center",background:idx%2===0?"rgba(255,255,255,0.02)":"transparent",borderBottom:"1px solid rgba(106,184,50,0.08)",minWidth:460}}>
                    <div style={{fontSize:14,color:"#c0a860",fontWeight:"bold",paddingRight:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p}</div>
                    {ROUNDS.map(r=>{
                      const isDay1=r===1;
                      const hcp=hdcpTable[p]?.[r]??0;
                      // figure out why it changed
                      let indicator=null;
                      if(r>1){
                        const prevStats=getDayAvgStats(players,scores,r-1);
                        if(prevStats){
                          if(prevStats.above.includes(p)) indicator={sym:"▼",color:"#6ab832",tip:"bajó"};
                          else if(prevStats.below.includes(p)) indicator={sym:"▲",color:"#e06060",tip:"subió"};
                        }
                      }
                      return(
                        <div key={r} style={{textAlign:"center",position:"relative"}}>
                          {isDay1?(
                            <input type="number" inputMode="numeric" value={baseHdcp[p]??0}
                              onChange={e=>handleBaseHdcp(p,e.target.value)}
                              style={{width:44,textAlign:"center",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(106,184,50,0.4)",borderRadius:6,color:"#f0d060",fontSize:15,fontWeight:"bold",padding:"4px 2px",fontFamily:"Georgia,serif",outline:"none"}}/>
                          ):(
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                              <span style={{fontSize:17,fontWeight:"bold",color:indicator?.color||"#e8d5a3",fontVariantNumeric:"tabular-nums"}}>{hcp}</span>
                              {indicator&&(
                                <span style={{fontSize:9,color:indicator.color,letterSpacing:0.5}}>{indicator.sym} {indicator.tip}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Summary per day */}
            <div style={{marginTop:20,padding:"12px 16px",background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(106,184,50,0.1)"}}>
              <div style={{fontSize:11,color:"#6ab832",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Promedio del grupo por día</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {ROUNDS.map(r=>{
                  const stats=getDayAvgStats(players,scores,r);
                  return(
                    <div key={r} style={{flex:"1 1 80px",background:"rgba(42,106,26,0.2)",borderRadius:8,padding:"8px 12px",textAlign:"center",border:"1px solid rgba(106,184,50,0.15)"}}>
                      <div style={{fontSize:10,color:"#4a8a2a",marginBottom:4}}>DÍA {r}</div>
                      <div style={{fontSize:18,fontWeight:"bold",color:stats?"#e8d5a3":"#3a5a3a"}}>
                        {stats?stats.avg.toFixed(1):"—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ JUGADORES ══════════════════════════════════════════════ */}
        {view==="jugadores"&&(
          <div>
            <div style={{fontSize:12,color:"#6ab832",letterSpacing:1,marginBottom:16}}>Tocá el nombre para editarlo</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
              {players.map((p,idx)=>(
                <div key={idx} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(106,184,50,0.15)",borderRadius:10,padding:"12px 14px"}}>
                  {editingPlayer===idx?(
                    <div style={{display:"flex",gap:6}}>
                      <input value={editName} onChange={e=>setEditName(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Enter")confirmPlayerEdit(idx);}}
                        style={{flex:1,background:"rgba(255,255,255,0.1)",border:"1px solid #6ab832",borderRadius:6,color:"#e8d5a3",padding:"4px 8px",fontSize:14,fontFamily:"Georgia,serif"}}
                        autoFocus/>
                      <button onClick={()=>confirmPlayerEdit(idx)} style={{background:"#2a6a1a",border:"none",borderRadius:6,color:"#e8d5a3",padding:"4px 10px",cursor:"pointer"}}>✓</button>
                    </div>
                  ):(
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:12,color:"#4a7a3a",marginBottom:2}}>#{idx+1}</div>
                        <div style={{fontSize:15,color:"#c0a860",fontWeight:"bold"}}>{p}</div>
                        <div style={{fontSize:10,color:"#4a8a2a"}}>Hcp día 1: {baseHdcp[p]??0}</div>
                      </div>
                      <button onClick={()=>handlePlayerEdit(idx)} style={{background:"transparent",border:"1px solid rgba(106,184,50,0.3)",borderRadius:6,color:"#6ab832",padding:"4px 8px",cursor:"pointer",fontSize:12}}>✎</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{marginTop:20,padding:14,background:"rgba(255,80,80,0.05)",border:"1px solid rgba(255,100,100,0.2)",borderRadius:10}}>
              <div style={{fontSize:12,color:"#e06060",marginBottom:8}}>⚠️ Resetear torneo</div>
              <button onClick={()=>{
                if(window.confirm("¿Seguro? Se borran todos los puntajes y hándicaps.")){
                  setScores({});
                  setBaseHdcp({});
                  const init={};
                  players.forEach(p=>ROUNDS.forEach(r=>{init[`${p}_${r}`]="";}));
                  setInputValues(init);
                }
              }} style={{background:"rgba(200,50,50,0.3)",border:"1px solid #c03030",borderRadius:8,color:"#f0a0a0",padding:"8px 16px",cursor:"pointer",fontSize:13}}>
                Borrar todos los puntajes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
