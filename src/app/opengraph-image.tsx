import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #000000 0%, #04111f 60%, #0A84FF 100%)',
          color: 'white',
          padding: '56px 64px',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '62%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ fontSize: 30, fontWeight: 700 }}>KplaWY</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Instant Replay Premium
            </div>
            <div style={{ fontSize: 66, lineHeight: 1.02, fontWeight: 800 }}>
              Grave o agora. Salve o instante que acabou de acontecer.
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.35, color: 'rgba(255,255,255,0.76)' }}>
              Tempo de replay configuravel, relogio, Bluetooth, multi-camera e privacidade total.
            </div>
          </div>
        </div>
        <div
          style={{
            width: '30%',
            borderRadius: 36,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 800, color: '#0A84FF' }}>K</div>
        </div>
      </div>
    ),
    size
  );
}
