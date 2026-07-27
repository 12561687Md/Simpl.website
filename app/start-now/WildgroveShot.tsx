/**
 * The left-side render for /start-now. Was a coded browser mock with two weird
 * conic-gradient "Simpl Score" gauges; replaced with the real brand phone render
 * (public/brand/simpl-app-duo.png), two phones showing the live Simpl audit, an
 * actual IMAGE, not HTML. No hooks now, so this is a plain server component.
 */
export default function WildgroveShot() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 540, margin: "0 auto" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/simpl-app-duo.png"
        alt="The Simpl app on two phones, showing a business's live audit score and where it stands"
        style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 44px 90px rgba(0,0,0,0.6))" }}
      />
    </div>
  );
}
