export default function Home() {
  return (
    <main className="media-home">
      <header className="media-header">
        <div className="media-brand">
          <img src="/assets/mse-avatar.png" alt="" />
          <div>
            <strong>MY SKIN EDIT</strong>
            <span>肌に、いいほう。</span>
          </div>
        </div>
        <p>公式情報を基準に、大人のコスメ選びを整理する比較メディア。</p>
      </header>

      <section className="media-hero">
        <p className="media-eyebrow">BEAUTY SHOPPING NOTES</p>
        <h1>迷う時間を減らす、<br />大人のコスメ比較。</h1>
        <p>使う場面・容量・処方表示を見比べて、自分に合う候補を絞れます。</p>
      </section>

      <section className="guide-section">
        <div className="guide-heading">
          <p>COMPARISON GUIDES</p>
          <h2>商品テーマから選ぶ</h2>
        </div>
        <div className="guide-grid">
          <a className="guide-card lotion" href="/lp/sensitive-lotion-5/">
            <span className="guide-status">NEW</span>
            <small>乾燥・肌荒れが気になる日に</small>
            <h3>敏感肌向け化粧水<br />5商品比較</h3>
            <p>しっとり感、医薬部外品、アルコール無添加、レフィルを比較。</p>
            <strong>比較を見る →</strong>
          </a>
          <a className="guide-card uv" href="/lp/daily-uv-5/">
            <span className="guide-status">UV CARE</span>
            <small>毎日用とレジャー用を整理</small>
            <h3>30代の日焼け止め<br />5商品比較</h3>
            <p>容量、落とし方、耐水性、香りを公式情報から比較。</p>
            <strong>比較を見る →</strong>
          </a>
        </div>
      </section>

      <footer className="media-footer">
        <strong>MY SKIN EDIT</strong>
        <nav aria-label="サイト情報">
          <a href="/about/">運営者情報</a>
          <a href="/privacy/">プライバシーポリシー</a>
          <a href="/advertising-policy/">広告ポリシー</a>
        </nav>
        <span>© 2026 MY SKIN EDIT</span>
      </footer>
    </main>
  );
}
