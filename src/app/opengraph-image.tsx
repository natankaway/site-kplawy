import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', padding: '68px 74px', color: 'white',
          background: 'radial-gradient(circle at 82% 28%, rgba(22,139,255,.30), transparent 38%), linear-gradient(135deg,#020408 0%,#06101c 62%,#020408 100%)',
          fontFamily: 'sans-serif', justifyContent: 'space-between', alignItems: 'stretch',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '67%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#168BFF', fontSize: 28, fontWeight: 900 }}>K</div>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 2 }}>KPLAWY</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 18, letterSpacing: 5, color: '#62AFFF', fontWeight: 800 }}>INSTANT SPORTS REPLAY</div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, lineHeight: .98, fontWeight: 900, letterSpacing: -3 }}>
              <span>PLAY FIRST.</span>
              <span style={{ color: '#168BFF' }}>SAVE IT AFTER.</span>
            </div>
            <div style={{ fontSize: 25, lineHeight: 1.35, color: '#AAB7C7' }}>Your phone keeps the last seconds ready. Tap REPLAY after the play happens.</div>
          </div>
        </div>
        <div style={{ width: '27%', borderRadius: 44, border: '1px solid rgba(130,180,235,.22)', background: 'linear-gradient(180deg,rgba(10,22,38,.96),rgba(4,8,14,.98))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 34px 90px rgba(0,0,0,.42)' }}>
          <div style={{ width: 178, height: 178, borderRadius: 999, border: '5px solid #168BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#08111D', boxShadow: '0 0 65px rgba(22,139,255,.34)', fontSize: 82, fontWeight: 900, letterSpacing: -8 }}>K</div>
        </div>
      </div>
    ),
    size,
  );
}
