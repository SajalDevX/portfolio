import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { IconX, IconExternalLink, IconCalendarEvent, IconBriefcase } from '@tabler/icons-react';
import { experienceTimeline, type ExperienceTimelineItem } from '../config/pages';
import { formatDate } from '../utils/date';

const isPast = (item: ExperienceTimelineItem): boolean => {
	return !!item.endDate;
};

export const Experience: React.FC = () => {
	return (
		<section className="px-4 py-8 md:px-0">
			<div className="mb-8">
				<h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
					<IconBriefcase size={28} className="text-accent" />
					<span>Experience</span>
				</h2>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-start">
				{experienceTimeline.map((item, i) => {
					const past = isPast(item);

					return (
						<React.Fragment key={item.company}>
							<Popover.Root>
								<Popover.Trigger asChild>
									<button
										className={`focus-visible:ring-accent group focus-visible:ring-offset-base flex cursor-pointer items-center gap-2 rounded text-sm transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
											past
												? 'opacity-60 hover:opacity-80 focus-visible:opacity-100'
												: 'hover:opacity-80 focus-visible:opacity-100'
										}`}
										aria-label={`View details for ${item.role} at ${item.company}`}
									>
										<img
											src={item.logoUrl}
											alt={item.logoAlt}
											className="flex max-h-8 min-h-7 w-auto min-w-6 grow-9 object-contain"
											style={item.logoScale ? { transform: `scale(${item.logoScale})` } : {}}
										/>
										<span className="text-subtext1 group-hover:text-text group-focus-visible:text-text">
											<span className="whitespace-nowrap">
												<span className={past ? '' : 'text-text font-medium'}>{item.company}</span>
												{past && <span className="text-overlay0 text-xs"> (Past)</span>}
											</span>
										</span>
									</button>
								</Popover.Trigger>

								<Popover.Portal>
									<Popover.Content
										className="border-surface0 bg-mantle text-text shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-30 max-w-xs rounded-xl border p-4"
										sideOffset={8}
										side="top"
										align="center"
									>
										<div className="mb-3 flex items-start justify-between">
											<div className="flex items-center gap-3">
												<img
													src={item.logoUrl}
													alt={item.logoAlt}
													className="h-10 w-auto max-w-16 shrink-0 rounded-md object-contain p-1"
													style={item.logoScale ? { transform: `scale(${item.logoScale})` } : {}}
												/>
												<div>
													<h4 className="text-text group-hover:text-accent font-semibold transition-colors">
														{item.company}
													</h4>
													<p className="text-subtext0 text-sm">{item.role}</p>
												</div>
											</div>
											<Popover.Close
												className="text-subtext1 hover:text-accent -m-1 cursor-pointer rounded p-1 transition-colors"
												aria-label="Close details"
											>
												<IconX size={18} />
											</Popover.Close>
										</div>

										{item.details && <p className="text-subtext1 mb-3 text-sm">{item.details}</p>}

										<div className="text-overlay0 mb-3 flex items-center gap-1.5 text-xs">
											<IconCalendarEvent size={14} className="shrink-0" />
											<span>{formatDate(item.startDate, { yearMonthOnly: true })}</span>
											<span>-</span>
											{item.endDate ? (
												<span>{formatDate(item.endDate, { yearMonthOnly: true })}</span>
											) : new Date(item.startDate) > new Date() ? (
												<span className="text-accent">Incoming</span>
											) : (
												<span>Present</span>
											)}
										</div>

										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm transition-colors"
										>
											<span>Visit Website</span>
											<IconExternalLink size={16} stroke={1.5} />
										</a>

										<Popover.Arrow className="fill-mantle" width={12} height={6} />
									</Popover.Content>
								</Popover.Portal>
							</Popover.Root>

							{i < experienceTimeline.length - 1 && (
								<span className="text-accent hidden md:inline">/</span>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};
