import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb: React.FC = () => {
	const location = useLocation();
	const breadcrumbs = location.pathname.split('/').filter(Boolean).slice(0, 4);

	return (
		<nav aria-label="Breadcrumbs">
			<ul className="text-md flex items-center">
				<li className="inline-flex items-center">
					<Link to="/" className="animation-wiggle text-accent hover:text-accent/40">
						~
					</Link>
				</li>

				{breadcrumbs.map((text, i) => {
					const href = '/' + breadcrumbs.slice(0, i + 1).join('/');
					const isLast = i === breadcrumbs.length - 1;

					return (
						<React.Fragment key={`Bred${i}`}>
							<li className="mx-0.5 inline-flex items-center">/</li>
							<li className="inline-flex items-center">
								{isLast ? (
									<span aria-current="page">{text}</span>
								) : (
									<Link to={href} className="animation-wiggle hover:text-accent">
										{text}
									</Link>
								)}
							</li>
						</React.Fragment>
					);
				})}

				<li className="mx-0.5 inline-flex items-center" aria-hidden="true">
					/
				</li>
				<li className="ml-1 inline-flex items-center">
					<span className="cursor-blink bg-accent h-4 w-2" aria-hidden="true"></span>
				</li>
			</ul>

			<style>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }
      `}</style>
		</nav>
	);
};
