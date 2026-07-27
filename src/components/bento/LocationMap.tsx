import React, { useEffect, useRef, useState } from 'react';
import { IconMapPin, IconSun, IconMoon } from '@tabler/icons-react';

export const LocationMap: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const [leafletLoaded, setLeafletLoaded] = useState(false);
	const [currentTime, setCurrentTime] = useState('');
	const [isDaytime, setIsDaytime] = useState(true);
	const mapInstanceRef = useRef<any>(null);

	const hometownCoords: [number, number] = [23.1815, 79.9864];
	const hometownTimezone = 'Asia/Kolkata';
	const hometownLabel = 'Jabalpur, IN';

	const updateTime = () => {
		const now = new Date();
		const localTime = new Intl.DateTimeFormat('en-US', {
			timeZone: hometownTimezone,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(now);
		setCurrentTime(localTime);

		const hour = parseInt(localTime.split(':')[0]);
		setIsDaytime(hour >= 6 && hour < 21);
	};

	useEffect(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);

		const loadMap = async () => {
			if (typeof window !== 'undefined' && mapContainer.current) {
				const L = (await import('leaflet')).default;
				await import('leaflet/dist/leaflet.css');

				mapInstanceRef.current = L.map(mapContainer.current, {
					zoomControl: false,
					attributionControl: false,
					dragging: true,
					scrollWheelZoom: true,
					doubleClickZoom: true,
					boxZoom: true,
					keyboard: true,
					touchZoom: true
				}).setView(hometownCoords, 11);

				L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
					maxZoom: 19,
					attribution: '',
					keepBuffer: 4,
					updateWhenIdle: false,
					updateWhenZooming: false
				}).addTo(mapInstanceRef.current);

				setLeafletLoaded(true);
			}
		};

		loadMap();

		return () => {
			clearInterval(interval);
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
			}
		};
	}, []);

	const recenterMap = () => {
		if (mapInstanceRef.current) {
			mapInstanceRef.current.setView(hometownCoords, 11);
		}
	};

	return (
		<div className="border-surface0 bg-base flex flex-col rounded-xl border p-4 shadow-lg lg:col-span-1">
			<button
				onClick={recenterMap}
				className="text-text hover:text-accent mb-3 flex w-full cursor-pointer items-center gap-2 text-left text-sm font-semibold transition-colors"
			>
				<IconMapPin size={16} className="text-accent" />
				Currently Based In 📍
			</button>
			<div
				className="bg-surface0 relative w-full flex-1 overflow-hidden rounded-lg"
				style={{ minHeight: '200px' }}
			>
				<div ref={mapContainer} className="bg-surface0 h-full w-full" />
				{!leafletLoaded && (
					<div className="bg-surface0 absolute inset-0 flex items-center justify-center">
						<span className="text-subtext1 text-xs">Loading map...</span>
					</div>
				)}
			</div>
			<div className="mt-3 flex items-center justify-between gap-2">
				<button
					onClick={recenterMap}
					className="text-subtext0 hover:text-accent cursor-pointer text-xs whitespace-nowrap transition-colors"
				>
					{hometownLabel}
				</button>
				{currentTime && (
					<div className="flex items-center gap-1">
						{isDaytime ? (
							<IconSun size={12} className="text-yellow" />
						) : (
							<IconMoon size={12} className="text-blue" />
						)}
						<span className="text-accent font-mono text-xs whitespace-nowrap">{currentTime}</span>
					</div>
				)}
			</div>
		</div>
	);
};
