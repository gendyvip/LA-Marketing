// Utility to resolve background images placed under src/assets/backgrounds
// Usage: getSectionBackground('hero') will try to load hero.* from that folder

export const getSectionBackground = (sectionName) => {
    try {
        const modules = import.meta.glob('../assets/backgrounds/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true });
        const normalized = Object.entries(modules).reduce((acc, [key, mod]) => {
            const match = key.match(/backgrounds\/(.+)\.[^.]+$/);
            if (match && mod && mod.default) {
                acc[match[1].toLowerCase()] = mod.default;
            }
            return acc;
        }, {});

        const bySection = normalized[sectionName?.toLowerCase?.()] || undefined;
        // Fallbacks: try generic names if exact section not found
        return (
            bySection ||
            normalized['default'] ||
            normalized['common'] ||
            undefined
        );
    } catch (err) {
        return undefined;
    }
};


