export const range = (start: number, stop: number, step: number = 1) =>
	Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);
