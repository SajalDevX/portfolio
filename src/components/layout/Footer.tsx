import React, { useEffect, useState } from 'react';
import { IconClock, IconGitCommit } from '@tabler/icons-react';
import Site, { Socials } from '../../config/common';
import { useTotalTimeOnSite } from '../../hooks/useTheme';

interface FooterProps {
  value?: string;
}

export const Footer: React.FC<FooterProps> = ({ value }) => {
  const year = new Date().getFullYear();
  const shortSha = import.meta.env.VITE_COMMIT_SHA 
    ? import.meta.env.VITE_COMMIT_SHA.substring(0, 7) 
    : 'dev';
  const commitLinkUrl = import.meta.env.VITE_COMMIT_SHA 
    ? `${Site.repo.commitBaseUrl}${import.meta.env.VITE_COMMIT_SHA}` 
    : '#';
  const analyticsEnabled = Boolean(
    Site.abacus.enabled && Site.abacus.instance && Site.abacus.namespace && Site.abacus.key
  );

  const [timeOnSite, setTimeOnSite] = useState('00:00');
  const [totalTime, setTotalTime] = useTotalTimeOnSite();
  const viewCountDisplay = value ?? '—';

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const sessionStart = Date.now();
    const initialTime = totalTime;

    const interval = setInterval(() => {
      const sessionElapsed = Math.floor((Date.now() - sessionStart) / 1000);
      setTimeOnSite(formatTime(initialTime + sessionElapsed));
    }, 1000);

    const saveTime = () => {
      const sessionElapsed = Math.floor((Date.now() - sessionStart) / 1000);
      setTotalTime(initialTime + sessionElapsed);
    };

    window.addEventListener('beforeunload', saveTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveTime);
      saveTime();
    };
  }, [totalTime, setTotalTime]);

  return (
    <div className="relative m-auto mx-5 mb-5">
      <footer className="bg-crust text-subtext0 border-surface0/20 flex h-auto flex-col items-center justify-center gap-y-3 rounded-lg border p-5 text-sm md:flex-row md:justify-between md:gap-y-0">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
          <span className="whitespace-nowrap">© {year} Sajal Kumar Jana</span>

          <span className="text-surface0 hidden md:inline">-</span>

          <div className="flex items-center gap-1 whitespace-nowrap" title="Service Status">
            <span className="relative mr-1.5 flex h-3 w-3">
              <span className="bg-green/75 absolute inline-flex h-full w-full animate-ping rounded-full" style={{ animationDuration: '2000ms' }}></span>
              <span className="bg-green relative inline-flex h-3 w-3 rounded-full"></span>
            </span>
            <span className="text-subtext1 text-sm font-medium">All Services Nominal</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-end">
          <div className="flex items-center gap-1.5" title="How long you have been surfing my site">
            <IconClock size={14} className="text-subtext1" />
            <span className="text-accent font-mono text-xs">{timeOnSite}</span>
          </div>

          <span className="text-surface0 hidden sm:inline">-</span>

          {analyticsEnabled ? (
            <span className="text-subtext1" title="Page views recorded via edge cache">
              {viewCountDisplay} views
            </span>
          ) : (
            <a
              href={Site.out.calcom}
              className="text-subtext1 hover:text-accent transition-colors duration-200"
              title="Reach out—always happy to chat about DX"
            >
              Open for collaborations
            </a>
          )}

          <span className="text-surface0 hidden sm:inline">-</span>

          {import.meta.env.VITE_COMMIT_SHA && import.meta.env.VITE_COMMIT_SHA !== 'dev' ? (
            <a
              href={commitLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtext1 hover:text-accent flex items-center gap-x-1 transition-colors duration-200"
              title={`View deployment commit (${import.meta.env.VITE_COMMIT_SHA})`}
            >
              <IconGitCommit size={18} stroke={1.5} className="shrink-0" />
              <span>{shortSha}</span>
            </a>
          ) : (
            <span className="text-overlay1 flex items-center gap-x-1" title="Development Build">
              <IconGitCommit size={18} stroke={1.5} className="shrink-0" />
              <span>{shortSha}</span>
            </span>
          )}

          <span className="text-surface0 hidden sm:inline">-</span>

          <div className="flex items-center gap-x-3">
            {Socials.filter((item) => item.footer).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-subtext1 hover:text-accent transition-colors duration-200"
                >
                  <Icon stroke={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};
