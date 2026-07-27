interface FormatDateOptions {
    yearMonthOnly?: boolean;
    shortMonth?: boolean;
}

export function formatDate(dateString: string, options: FormatDateOptions = {}): string {
    const date = new Date(dateString);

    if (options.yearMonthOnly) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }

    if (options.shortMonth) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
