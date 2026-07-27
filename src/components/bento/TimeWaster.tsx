import React, { useState, useEffect } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export const TimeWaster: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [clickCount, setClickCount] = useState(() => {
		if (typeof window !== 'undefined') {
			return parseInt(localStorage.getItem('waste-clicks') || '0');
		}
		return 0;
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('waste-clicks', clickCount.toString());
		}
	}, [clickCount]);

	const handleClick = () => {
		setClickCount((prev) => prev + 1);
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};

	return (
		<div className="border-surface0 bg-base relative flex flex-col rounded-xl border p-4 shadow-lg lg:col-span-1">
			<button
				className="text-text/50 hover:text-accent absolute top-2 right-2 transition-colors"
				aria-label="Info"
			>
				<IconInfoCircle size={16} />
			</button>

			<div className="flex flex-1 flex-col items-center justify-center space-y-4 py-4">
				<div className="text-center">
					<div className="text-text text-5xl font-bold tabular-nums md:text-6xl">
						{clickCount.toLocaleString()}
					</div>
					<button
						onClick={handleClick}
						className="bg-rosewater hover:bg-rosewater/90 mt-4 rounded-lg px-6 py-2.5 text-base font-semibold tracking-wide uppercase transition-all hover:scale-105"
					>
						CLICK ME
					</button>
					<p className="text-subtext0 mt-3 text-xs">
						you've clicked {clickCount} {clickCount === 1 ? 'time' : 'times'}
					</p>
				</div>
			</div>

			<div className="border-surface0 mt-auto border-t pt-3 text-center">
				<div className="text-accent font-mono text-2xl font-bold">{formatTime(currentTime)}</div>
				<div className="text-subtext0 mt-1 text-xs">{formatDate(currentTime)}</div>
			</div>
		</div>
	);
};
