import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Language-neutral OG card (shared across locales) — brand navy + the rewind
// «« motif + a two-tone headline. No locale-specific copy.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'radial-gradient(circle at 78% 30%, rgba(46,123,255,0.28), transparent 55%), linear-gradient(135deg, #0A0F1A 0%, #070B13 55%, #0A0F1A 100%)',
          color: 'white',
          padding: '64px 72px',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '64%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: 'rgba(46,123,255,0.16)',
                border: '1px solid rgba(46,123,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4D97FF',
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              «
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>KplaWY</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#4D97FF',
                fontFamily: 'monospace',
              }}
            >
              Instant Replay · Adjustable Buffer
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, lineHeight: 0.98, fontWeight: 800, textTransform: 'uppercase' }}>
              <span>Save the play</span>
              <span style={{ color: '#4D97FF' }}>after it happens.</span>
            </div>
            <div style={{ fontSize: 26, lineHeight: 1.35, color: '#9AA4B2' }}>
              Continuous buffer, watch &amp; Bluetooth triggers, multi-cam and full privacy.
            </div>
          </div>
        </div>
        <div
          style={{
            width: '30%',
            borderRadius: 40,
            border: '1px solid rgba(255,255,255,0.1)',
            background:
              'radial-gradient(circle at 50% 42%, rgba(46,123,255,0.22), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
          }}
        >
          <div
            style={{
              width: 168,
              height: 168,
              borderRadius: 999,
              border: '2px solid rgba(77,151,255,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(46,123,255,0.45), inset 0 0 30px rgba(46,123,255,0.25)',
              color: '#9FC4FF',
              fontSize: 64,
              fontWeight: 800,
            }}
          >
            ««
          </div>
        </div>
      </div>
    ),
    size,
  );
}
