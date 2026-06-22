<script setup>
import imgPortrait from '@/assets/images/odmb.jpg'
import imgAlbum from '@/assets/images/ezioku.jpg'
import imgClip from '@/assets/images/indmach.webp'
import imgArsenal from '@/assets/images/arsenal.png'

// No JS here: App.vue drives both the scroll parallax (data-hero-top/bottom) and
// the entrance (data-in on [data-entrance] after the loader). Mouse parallax on
// [data-depth] is also driven externally — this component only declares the hooks.
</script>

<template>
  <section id="hero" class="hero" data-hero>
    <!-- background layers -->
    <div class="glow" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>

    <!-- back word -->
    <div class="word-top" data-hero-top>
      <div class="word-top-text" data-entrance="rise">ODUMODU</div>
    </div>

    <!-- center portrait -->
    <div class="portrait-pos">
      <div class="portrait-depth" data-depth="1.2">
        <div class="portrait-frame" data-entrance="soft">
          <img class="portrait-img" :src="imgPortrait" alt="ODUMODUBLVCK" />
        </div>
      </div>
    </div>

    <!-- front word -->
    <div class="word-bottom" data-hero-bottom>
      <div class="word-bottom-text" data-entrance="rise">BL<span class="v">V</span>CK</div>
    </div>

    <!-- sticker 1 — album polaroid (top left) -->
    <div class="st st-album mag" data-depth="2.4" data-cursor>
      <div data-entrance="pop">
        <div class="float-6">
          <div class="polaroid polaroid-album">
            <img class="album-img" :src="imgAlbum" alt="Eziokwu" />
            <div class="album-label">Eziokwu</div>
          </div>
        </div>
      </div>
    </div>

    <!-- sticker 2 — red badge (top right) -->
    <div class="st st-red" data-depth="3.2">
      <div data-entrance="pop">
        <div class="floatslow-7">
          <div class="badge-red">Site of<br />the Day</div>
        </div>
      </div>
    </div>

    <!-- sticker 3 — clip polaroid (mid left) -->
    <div class="st st-clip mag" data-depth="1.6" data-cursor>
      <div data-entrance="pop">
        <div class="float-8">
          <div class="polaroid polaroid-clip">
            <img class="clip-img" :src="imgClip" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- sticker 4 — headies badge (mid right) -->
    <div class="st st-headies" data-depth="2.8">
      <div data-entrance="pop">
        <div class="floatslow-65">
          <div class="badge-headies">
            <div class="headies-star">★</div>
            <div class="headies-text">HEADIES<br />WINNER</div>
          </div>
        </div>
      </div>
    </div>

    <!-- sticker 5 — Arsenal crest (bottom left) -->
    <div class="st st-arsenal mag" data-depth="2.2" data-cursor>
      <div data-entrance="pop">
        <div class="float-75">
          <div class="crest">
            <div class="crest-inner">
              <img class="crest-img" :src="imgArsenal" alt="Arsenal crest" />
            </div>
            <div class="crest-label">COYG</div>
          </div>
        </div>
      </div>
    </div>

    <!-- sticker 6 — orange badge (bottom right) -->
    <div class="st st-orange" data-depth="2.0">
      <div data-entrance="pop">
        <div class="floatslow-7">
          <div class="badge-orange">New Album Out</div>
        </div>
      </div>
    </div>

    <!-- bottom meta -->
    <div class="meta-left">
      <span class="cue" data-scrollcue>↓</span> Scroll to enter
    </div>
    <div class="meta-right">Abuja, NG · Rap / Drill<br />Antiworld Sound</div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 760px;
  overflow: hidden;
  background: var(--color-bg);
}

/* ---- background layers (rgba glow/grain have no tokens — literal per source) ---- */
.glow {
  position: absolute;
  inset: 0;
  z-index: var(--z-hero-gradient);
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 50% 16%, rgba(255, 106, 0, 0.1), rgba(5, 5, 5, 0) 55%),
    radial-gradient(100% 100% at 50% 122%, rgba(255, 45, 45, 0.09), rgba(5, 5, 5, 0) 50%);
}

.grain {
  position: absolute;
  inset: 0;
  z-index: 6; /* no token above sticker:5 */
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 4px 4px;
  mix-blend-mode: overlay;
}

/* ---- back word: ODUMODU ---- */
.word-top {
  position: absolute;
  top: 13vh;
  left: 0;
  right: 0;
  text-align: center;
  z-index: var(--z-hero-back);
  will-change: transform;
}
.word-top-text {
  font-family: var(--font-display);
  font-size: min(17vw, 250px);
  line-height: 0.8;
  letter-spacing: -2px;
  color: var(--color-fg);
}

/* ---- center portrait ---- */
.portrait-pos {
  position: absolute;
  top: 17vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: var(--z-hero-portrait);
}
.portrait-depth {
  width: min(30vw, 380px);
  height: min(58vh, 540px);
  will-change: transform;
}
.portrait-frame {
  width: 100%;
  height: 100%;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
}
.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ---- front word: BLVCK ---- */
.word-bottom {
  position: absolute;
  bottom: -3.4vh;
  left: 0;
  right: 0;
  text-align: center;
  z-index: var(--z-hero-front);
  will-change: transform;
}
.word-bottom-text {
  font-family: var(--font-display);
  font-size: min(21vw, 300px);
  line-height: 0.8;
  letter-spacing: -3px;
  color: var(--color-cream);
}
.word-bottom-text .v {
  color: var(--color-red);
}

/* ---- stickers: shared ---- */
.st {
  position: absolute;
  z-index: var(--z-hero-sticker);
}
.st-album {
  top: 24vh;
  left: 7vw;
}
.st-red {
  top: 19vh;
  right: 9vw;
}
.st-clip {
  top: 50vh;
  left: 6vw;
}
.st-headies {
  top: 47vh;
  right: 8vw;
}
.st-arsenal {
  bottom: 19vh;
  left: 15vw;
  z-index: 6; /* lifted above the grain, as in the source */
}
.st-orange {
  bottom: 15vh;
  right: 13vw;
}

/* float loops (keyframes live in animations.css) */
.float-6 {
  animation: floaty 6s ease-in-out infinite;
}
.float-8 {
  animation: floaty 8s ease-in-out infinite;
}
.float-75 {
  animation: floaty 7.5s ease-in-out infinite;
}
.floatslow-7 {
  animation: floatySlow 7s ease-in-out infinite;
}
.floatslow-65 {
  animation: floatySlow 6.5s ease-in-out infinite;
}

/* polaroids — pure white is intentional (no white token) */
.polaroid {
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.55);
  background: #fff;
}
.polaroid-album {
  padding: 8px 8px 30px;
  transform: rotate(-8deg);
}
.album-img {
  width: 148px;
  height: 148px;
  object-fit: cover;
  display: block;
}
.album-label {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-bg); /* source #111 → nearest token; on white it reads identical */
  text-align: center;
  margin-top: 8px;
  font-weight: 700;
}
.polaroid-clip {
  padding: 7px;
  transform: rotate(6deg);
}
.clip-img {
  width: 122px;
  height: 152px;
  object-fit: cover;
  display: block;
}

/* red badge */
.badge-red {
  background: var(--color-red);
  color: var(--color-bg);
  padding: 12px 16px;
  transform: rotate(9deg);
  box-shadow: 0 22px 44px rgba(255, 45, 45, 0.3);
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
}

/* headies badge */
.badge-headies {
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background: var(--color-cream);
  color: var(--color-bg);
  transform: rotate(-10deg);
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.5);
  border: 3px solid var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.headies-star {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 0.8;
}
.headies-text {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-top: 3px;
}

/* Arsenal crest — pure white outer disc is intentional */
.crest {
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: #fff;
  transform: rotate(-7deg);
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.crest-inner {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  overflow: hidden;
}
.crest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.crest-label {
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%) rotate(-7deg);
  background: var(--color-red);
  color: #fff; /* pure white, per the design */
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 3px 9px;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}

/* orange badge */
.badge-orange {
  background: var(--color-orange);
  color: var(--color-bg);
  padding: 11px 16px;
  transform: rotate(7deg);
  box-shadow: 0 22px 44px rgba(255, 106, 0, 0.3);
  font-family: var(--font-display);
  font-size: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ---- bottom meta ---- */
.meta-left {
  position: absolute;
  bottom: 30px;
  left: var(--page-x);
  z-index: 7; /* no token above sticker:5 */
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-text-2);
}
.cue {
  font-family: var(--font-display);
  font-size: 16px;
  display: inline-block;
}
.meta-right {
  position: absolute;
  bottom: 30px;
  right: var(--page-x);
  z-index: 7;
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-muted);
  text-align: right;
}
</style>
