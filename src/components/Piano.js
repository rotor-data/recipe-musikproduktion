import React, { useState, useEffect, useRef } from "react"

// --- Notes
const NOTES = {
  C: 261.63, "C#": 277.18, D: 293.66, "D#": 311.13,
  E: 329.63, F: 349.23, "F#": 369.99, G: 392.0,
  "G#": 415.3, A: 440.0, "A#": 466.16, B: 493.88, C2: 523.25
}
const WHITE = ["C", "D", "E", "F", "G", "A", "B", "C2"]
const BLACK = ["C#", "D#", null, "F#", "G#", "A#", null]
const KEYMAP = {
  a: "C", w: "C#", s: "D", e: "D#", d: "E",
  f: "F", t: "F#", g: "G", y: "G#", h: "A",
  u: "A#", j: "B", k: "C2"
}

// --- Global AudioContext
if (typeof window !== "undefined") {
  if (!window._audioContext || window._audioContext.state === "closed") {
    window._audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
}

// --- Knob component
const Knob = ({ label, value, min, max, step = 0.01, onChange }) => {
  const [val, setVal] = useState(value)
  const radius = 20
  const deg = ((val - min) / (max - min)) * 270 - 135

  const handleDrag = (e) => {
    const startY = e.clientY
    const startVal = val
    const move = (ev) => {
      const delta = (startY - ev.clientY) * (max - min) / 150
      let newVal = Math.min(max, Math.max(min, startVal + delta))
      setVal(newVal)
      onChange(newVal)
    }
    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "60px" }}>
      <svg width="50" height="50" onMouseDown={handleDrag} style={{ cursor: "grab" }}>
        <circle cx="25" cy="25" r={radius} fill="#222" stroke="#555" strokeWidth="2" />
        <line
          x1="25"
          y1="25"
          x2={25 + radius * Math.cos((deg * Math.PI) / 180)}
          y2={25 + radius * Math.sin((deg * Math.PI) / 180)}
          stroke="#00d1b2"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontSize: "0.75rem", color: "var(--rec-white)" }}>{label}</span>
      <span style={{ fontSize: "0.7rem" , color: "var(--rec-white)" }}>{val.toFixed(2)}</span>
    </div>
  )
}

// --- Piano key
const PianoKey = ({ note, active, isBlack, style, onMouseDown, onMouseUp }) => (
  <div
    onMouseDown={() => onMouseDown(note)}
    onMouseUp={() => onMouseUp(note)}
    onMouseLeave={() => onMouseUp(note)}
    style={{
      ...style,
      width: isBlack ? 40 : 60,
      height: isBlack ? 130 : 200,
      position: "absolute",
      left: style.left,
      top: style.top || 0,
      backgroundColor: isBlack
        ? active ? "#d4aa00" : "#111"
        : active ? "#3273dc" : "#00d1b2",
      zIndex: isBlack ? 2 : 1,
      borderRadius: 6,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: "0.3rem",
      cursor: "pointer",
      color: "white",
      fontWeight: "bold"
    }}
  >
    {note}
  </div>
)

const Piano = () => {
  const [ctx, setCtx] = useState(null)
  const [started, setStarted] = useState(false)
  const [wave, setWave] = useState("sawtooth")

  // ADSR
  const [atk, setAtk] = useState(0.05)
  const [dec, setDec] = useState(0.2)
  const [sus, setSus] = useState(0.7)
  const [rel, setRel] = useState(0.5)

  // FX
  const [fltAtk, setFltAtk] = useState(0.2)
  const [uni, setUni] = useState(6)
  const [sat, setSat] = useState(120)
  const [chorR, setChorR] = useState(0.3)
  const [chorD, setChorD] = useState(0.003)
  const [vibR, setVibR] = useState(5)
  const [vibA, setVibA] = useState(8)
  const [dlyT, setDlyT] = useState(0.4)
  const [dlyF, setDlyF] = useState(0.3)
  const [noiseMix, setNoiseMix] = useState(0.2)
  const [revMix, setRevMix] = useState(0.4)
  const [reverbBuffer, setReverbBuffer] = useState(null)

  const oscRef = useRef({})

  useEffect(() => {
    // load impulse response for reverb
    const loadIR = async () => {
      const ctx = window._audioContext
      const response = await fetch("/impulse-responses/hall.wav")
      const buffer = await response.arrayBuffer()
      const decoded = await ctx.decodeAudioData(buffer)
      setReverbBuffer(decoded)
    }
    loadIR().catch(console.error)
  }, [])

  const makeCurve = (amt = 150) => {
    const n = 44100
    const curve = new Float32Array(n)
    const deg = Math.PI / 180
    for (let i = 0; i < n; ++i) {
      const x = (i * 2) / n - 1
      curve[i] = ((1 + amt) * x * 20 * deg) / (Math.PI + amt * Math.abs(x))
    }
    return curve
  }

  const createNoise = (ctx) => {
    const b = ctx.createBuffer(1, 2 * ctx.sampleRate, ctx.sampleRate)
    const data = b.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    return b
  }

  const startAudio = async () => {
    const context = window._audioContext
    await context.resume()
    setCtx(context)
    setStarted(true)
  }

  const playNote = (note) => {
    if (!ctx) return
    const now = ctx.currentTime
    const freq = NOTES[note]

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(1, now + atk)
    env.gain.linearRampToValueAtTime(sus, now + atk + dec)

    // --- oscillators
    const o1 = ctx.createOscillator()
    const o2 = ctx.createOscillator()
    o1.type = o2.type = wave
    o1.frequency.value = o2.frequency.value = freq
    o1.detune.value = -uni
    o2.detune.value = +uni

    // --- filter
    const flt = ctx.createBiquadFilter()
    flt.type = "lowpass"
    flt.frequency.setValueAtTime(600, now)
    flt.frequency.linearRampToValueAtTime(3500, now + fltAtk)

    // --- vibrato
    const vib = ctx.createOscillator()
    const vibG = ctx.createGain()
    vib.frequency.value = vibR
    vibG.gain.value = vibA
    vib.connect(vibG).connect(o1.detune)
    vib.connect(vibG).connect(o2.detune)
    vib.start()

    o1.connect(flt)
    o2.connect(flt)

    // --- saturation
    const satNode = ctx.createWaveShaper()
    satNode.curve = makeCurve(sat)
    satNode.oversample = "2x"

    // --- chorus
    const dL = ctx.createDelay()
    const dR = ctx.createDelay()
    dL.delayTime.value = 0.012
    dR.delayTime.value = 0.018
    const lfo = ctx.createOscillator()
    const lfoG = ctx.createGain()
    lfo.frequency.value = chorR
    lfoG.gain.value = chorD
    lfo.connect(lfoG)
    lfoG.connect(dL.delayTime)
    lfoG.connect(dR.delayTime)
    lfo.start()

    // --- reverb
    const rev = ctx.createConvolver()
    if (reverbBuffer) rev.buffer = reverbBuffer
    const revGain = ctx.createGain()
    revGain.gain.value = revMix

    // --- delay
    const dly = ctx.createDelay(5.0)
    dly.delayTime.value = dlyT
    const fb = ctx.createGain()
    fb.gain.value = dlyF
    dly.connect(fb)
    fb.connect(dly)

    // chain
    flt.connect(dL)
    flt.connect(dR)
    dL.connect(satNode)
    dR.connect(satNode)
    satNode.connect(env)
    env.connect(revGain)
    revGain.connect(rev)
    rev.connect(ctx.destination)
    env.connect(ctx.destination)
    env.connect(dly)
    dly.connect(ctx.destination)

    // noise separate
    const noise = ctx.createBufferSource()
    noise.buffer = createNoise(ctx)
    const nG = ctx.createGain()
    nG.gain.value = noiseMix
    noise.connect(nG)
    nG.connect(ctx.destination)
    noise.loop = true
    noise.start()

    const stop = () => {
      const now = ctx.currentTime
      env.gain.cancelScheduledValues(now)
      env.gain.setValueAtTime(env.gain.value, now)
      env.gain.linearRampToValueAtTime(0.0001, now + rel)
      o1.stop(now + rel)
      o2.stop(now + rel)
      vib.stop(now + rel)
      lfo.stop(now + rel)
      noise.stop(now + rel)
    }

    o1.start()
    o2.start()
    oscRef.current[note] = { stop }
  }

  const stopNote = (note) => {
    const osc = oscRef.current[note]
    if (osc) {
      osc.stop()
      delete oscRef.current[note]
    }
  }

  useEffect(() => {
    if (!started || !ctx) return
    const down = (e) => {
      const n = KEYMAP[e.key]
      if (n && !oscRef.current[n]) playNote(n)
    }
    const up = (e) => {
      const n = KEYMAP[e.key]
      if (n) stopNote(n)
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [started, ctx, wave, atk, dec, sus, rel, fltAtk, uni, sat, chorR, chorD, vibR, vibA, dlyT, dlyF, noiseMix, revMix])

  if (!started)
    return (
      <div className="has-text-centered mt-6">
        <button className="button is-primary is-medium" onClick={startAudio}>
          🎛 Start Synth
        </button>
      </div>
    )

  return (
    <div className="container has-text-centered mt-6">
      {/* waveform */}
      <div style={{ marginBottom: "1rem" }}>
        <select value={wave} onChange={(e) => setWave(e.target.value)} className="select is-small">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Saw</option>
        </select>
      </div>

      {/* knobs grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 60px)", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        <Knob label="Atk" value={atk} min={0} max={2} onChange={setAtk} />
        <Knob label="Dec" value={dec} min={0} max={2} onChange={setDec} />
        <Knob label="Sus" value={sus} min={0} max={1} onChange={setSus} />
        <Knob label="Rel" value={rel} min={0} max={3} onChange={setRel} />

        <Knob label="FltA" value={fltAtk} min={0} max={2} onChange={setFltAtk} />
        <Knob label="Uni" value={uni} min={0} max={20} onChange={setUni} />
        <Knob label="Sat" value={sat} min={0} max={400} onChange={setSat} />
        <Knob label="ChR" value={chorR} min={0} max={2} onChange={setChorR} />
        <Knob label="ChD" value={chorD} min={0} max={0.01} onChange={setChorD} />
        <Knob label="VibR" value={vibR} min={0} max={10} onChange={setVibR} />
        <Knob label="VibA" value={vibA} min={0} max={50} onChange={setVibA} />
        <Knob label="DlyT" value={dlyT} min={0} max={1} onChange={setDlyT} />
        <Knob label="DlyF" value={dlyF} min={0} max={0.9} onChange={setDlyF} />
        <Knob label="Rev" value={revMix} min={0} max={1} onChange={setRevMix} />
        <Knob label="Noise" value={noiseMix} min={0} max={1} onChange={setNoiseMix} />
      </div>

      {/* piano */}
      <div style={{ position: "relative", height: "200px", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: `${WHITE.length * 62}px`, height: "200px" }}>
          {WHITE.map((n, i) => (
            <PianoKey key={n} note={n} isBlack={false} style={{ left: `${i * 62}px` }} onMouseDown={playNote} onMouseUp={stopNote} />
          ))}
          {BLACK.map((n, i) => {
            if (!n) return null
            const offs = [45, 107, null, 231, 293, 355, null]
            if (!offs[i]) return null
            return <PianoKey key={n} note={n} isBlack={true} style={{ left: `${offs[i]}px` }} onMouseDown={playNote} onMouseUp={stopNote} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Piano

if (module.hot) {
  module.hot.accept(() => window.location.reload())
}
