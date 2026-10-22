/*
 * Copyright 2015 randalkamradt.
 *
 */

let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function makeBeep(ctx) {
  const frameCount = ctx.sampleRate * 0.5
  const buf = ctx.createBuffer(2, frameCount, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < frameCount; i++) {
      const amp = (frameCount - i) / frameCount
      data[i] = Math.random() * 2 * amp - 1
    }
  }
  return buf
}

function makeBloop(ctx) {
  const frameCount = ctx.sampleRate * 0.5
  const buf = ctx.createBuffer(2, frameCount, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < frameCount; i++) {
      const amp = i / frameCount
      data[i] = Math.random() * 0.33 * amp - 1
    }
  }
  return buf
}

export default function soundsFactory() {
  // Buffers are built lazily on first call so AudioContext exists by then
  let beepBuf = null
  let bloopBuf = null

  return {
    beep() {
      const ctx = getCtx()
      if (!beepBuf) beepBuf = makeBeep(ctx)
      const src = ctx.createBufferSource()
      src.buffer = beepBuf
      src.connect(ctx.destination)
      src.start()
    },
    bloop() {
      const ctx = getCtx()
      if (!bloopBuf) bloopBuf = makeBloop(ctx)
      const src = ctx.createBufferSource()
      src.buffer = bloopBuf
      src.connect(ctx.destination)
      src.start()
    },
  }
}
