import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './AboutPage.css';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

function AboutStickerFilter() {
  return (
    <svg className="cw-about__defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="about-cutout-sticker" x="-14%" y="-10%" width="128%" height="124%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="7.5" result="outer-dilate" />
          <feTurbulence type="fractalNoise" baseFrequency=".022 .028" numOctaves="4" seed="11" result="tear-macro" />
          <feDisplacementMap in="outer-dilate" in2="tear-macro" scale="8.5" xChannelSelector="R" yChannelSelector="G" result="torn-outer" />
          <feFlood floodColor="#fff9f0" result="paper-core" />
          <feComposite in="paper-core" in2="torn-outer" operator="in" result="deckle-outer" />

          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="inner-dilate" />
          <feDisplacementMap in="inner-dilate" in2="tear-macro" scale="4.2" xChannelSelector="G" yChannelSelector="B" result="torn-inner" />
          <feTurbulence type="fractalNoise" baseFrequency=".42" numOctaves="3" seed="16" result="paper-tooth" />
          <feColorMatrix
            type="matrix"
            values="0.12 0 0 0 0.86  0 0.11 0 0 0.77  0 0 0.1 0 0.65  0 0 0 0 1"
            in="paper-tooth"
            result="textured-cream"
          />
          <feComposite in="textured-cream" in2="torn-inner" operator="in" result="deckle-inner" />

          <feGaussianBlur in="torn-outer" stdDeviation="6.5" result="blurred-shadow" />
          <feOffset in="blurred-shadow" dx="1.5" dy="8" result="offset-shadow" />
          <feFlood floodColor="#210817" floodOpacity=".38" result="shadow-color" />
          <feComposite in="shadow-color" in2="offset-shadow" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="deckle-outer" />
            <feMergeNode in="deckle-inner" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <section className="cw-about" aria-label="About Cecilia Du">
      <AboutStickerFilter />

      <div className="cw-about__nav">
        <div className="cw-about__crumbs">
          <button
            type="button"
            onClick={() => onNavigate('/?bag=open')}
            className="cw-about__back-link cw-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>BACK TO BAG</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="cw-about__back-link cw-about__back-link--muted cw-mono"
          >
            <span>BACK TO HOME</span>
          </button>
        </div>
        <span className="cw-about__kicker cw-mono">01 / ABOUT — HYBRID CREATIVE</span>
      </div>

      <div className="cw-about__main">
        <header className="cw-about__header">
          <h1 className="cw-about__title" aria-label="HELLO, I'M CECILIA">
            <span className="cw-about__title-line cw-about__title-line--a cw-serif">
              HELLO, I&apos;M
            </span>
            <span className="cw-about__title-line cw-about__title-line--b cw-serif">
              CECILIA
            </span>
            <img
              className="cw-about__title-star"
              src="/assets/stickers/pink-glitter-star.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="cw-about__title-lines"
              src="/assets/stickers/lines-cream.svg"
              alt=""
              aria-hidden="true"
            />
          </h1>
        </header>

        <div className="cw-about__stage">
          <article className="cw-about__col cw-about__col--left" aria-labelledby="about-strategist-heading">
            <div className="cw-about__col-heading-wrap">
              <h2
                id="about-strategist-heading"
                className="cw-about__col-heading cw-about__col-heading--cream font-editorial"
              >
                THE STRATEGIST
              </h2>
              <img
                className="cw-about__col-tape"
                src="/assets/stickers/tape-polka.svg"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className="cw-about__copy">
              <p>
                With 10+ years of experience across marketing, branding and content, I&apos;ve
                worked with global luxury brands, creative agencies and tech companies.
              </p>
              <p>
                I enjoy turning business goals into meaningful brand stories and strategies that
                connect with people.
              </p>
            </div>
          </article>

          <div className="cw-about__portrait-col">
            <div className="cw-about__portrait-backdrop" aria-hidden="true" />
            <figure className="cw-about__portrait-figure">
              <img
                src="/assets/cutouts/cecilia-about.png"
                alt="Cecilia Du wearing sunglasses pushed onto her head and a black bow tube top"
                className="cw-about__portrait-img"
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>

          <article className="cw-about__col cw-about__col--right" aria-labelledby="about-creative-heading">
            <div className="cw-about__col-heading-wrap">
              <h2
                id="about-creative-heading"
                className="cw-about__col-heading cw-about__col-heading--pink font-editorial"
              >
                THE CREATIVE
              </h2>
            </div>
            <div className="cw-about__copy">
              <p>
                From storytelling and visual content to digital experiences, I&apos;m always exploring
                new ways to bring ideas to life.
              </p>
              <p>
                Curious by nature, I love connecting cultures, aesthetics and technology to create
                something distinctive.
              </p>
            </div>
          </article>
        </div>
      </div>

      <footer className="cw-about__footer">
        <div className="cw-about__keywords-wrap">
          <span className="cw-about__keywords-note cw-hand" aria-hidden="true">
            notes:
          </span>
          <p className="cw-about__keywords cw-mono">
            BARCELONA · BRAND STRATEGY · CONTENT · DIGITAL · CREATIVE
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/services')}
          className="cw-about__next-link cw-mono"
        >
          <span>NEXT: 02 — SERVICES</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
};
