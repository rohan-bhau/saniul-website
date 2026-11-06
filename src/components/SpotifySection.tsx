"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

function SpotifyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.215.353-.674.465-1.027.25-2.812-1.718-6.353-2.107-10.523-1.155-.404.092-.806-.164-.898-.567-.092-.403.164-.805.567-.897 4.568-1.044 8.486-.597 11.63 1.341.354.216.466.674.251 1.028zm1.468-3.26c-.27.44-.848.58-1.288.31-3.219-1.978-8.125-2.55-11.932-1.394-.496.15-1.023-.133-1.173-.628-.151-.496.133-1.024.629-1.174 4.356-1.322 9.774-.683 13.454 1.58.44.27.58.847.31 1.288zm.126-3.407c-3.86-2.292-10.228-2.503-13.896-1.39-.593.18-1.22-.16-1.4-.754-.18-.593.16-1.22.754-1.4 4.218-1.281 11.252-1.036 15.698 1.604.533.316.708 1.011.391 1.544-.316.533-1.011.708-1.547.396z" />
    </svg>
  );
}

export function SpotifySection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="spotify-section" aria-labelledby="spotify-title">
      <div className="spotify-card">
        <div className="spotify-copy">
          <h2 id="spotify-title">
            A little focus.
            <br />
            <span>A lot of execution.</span>
          </h2>

          <p className="spotify-description">
            Soundscapes and curated tracks that power disciplined execution, daily
            operations, and strategic clarity. Take a look at the rotation playing in
            the background.
          </p>

          <a
            className="spotify-open-link"
            href="https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyIcon size={17} />
            <span>Deep Work on Spotify</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="spotify-player-frame">
          {!loaded && (
            <div className="spotify-player-skeleton" aria-hidden="true">
              <div className="spotify-skeleton-header">
                <span className="skeleton-block spotify-skeleton-cover" />
                <div className="spotify-skeleton-copy">
                  <span className="skeleton-block spotify-skeleton-title" />
                  <span className="skeleton-block spotify-skeleton-subtitle" />
                  <span className="skeleton-block spotify-skeleton-saved" />
                </div>
                <span className="skeleton-block spotify-skeleton-brand" />
              </div>
              <span className="skeleton-block spotify-skeleton-preview-label" />
              <div className="spotify-skeleton-tracks">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="spotify-skeleton-track">
                    <span className="skeleton-block spotify-skeleton-track-number" />
                    <div className="spotify-skeleton-track-copy">
                      <span className="skeleton-block spotify-skeleton-track-title" />
                      <span className="skeleton-block spotify-skeleton-track-artist" />
                    </div>
                    <span className="skeleton-block spotify-skeleton-track-duration" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <iframe
            className="spotify-embed"
            title="Spotify playlist: Deep Focus"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}

