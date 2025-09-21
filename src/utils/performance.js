import React from 'react';

// Preload critical resources for better performance
export const preloadResource = (href, as, type = null) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
};

// Preload critical images for LCP optimization
export const preloadCriticalImages = () => {
    // Preload critical CSS
    preloadResource('/critical.css', 'style');

    // Preload hero background image with high priority
    const heroImg = new Image();
    heroImg.src = '/src/assets/backgrounds/Backgrounds-01.png';
    heroImg.loading = 'eager';
    heroImg.fetchPriority = 'high';
};

// Image loading optimization utilities
export const createOptimizedImageProps = (src, alt, options = {}) => {
    const {
        loading = 'lazy',
        decoding = 'async',
        onError,
        onLoad,
        ...otherProps
    } = options;

    return {
        src,
        alt,
        loading,
        decoding,
        onError: (e) => {
            console.error(`Failed to load image: ${src}`);
            e.target.style.display = 'none';
            if (onError) onError(e);
        },
        onLoad: (e) => {
            e.target.style.opacity = '1';
            if (onLoad) onLoad(e);
        },
        ...otherProps
    };
};

// Intersection Observer for advanced lazy loading
export const useIntersectionObserver = (callback, options = {}) => {
    const [node, setNode] = React.useState(null);
    const [isIntersecting, setIsIntersecting] = React.useState(false);

    React.useEffect(() => {
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting) {
                    callback();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options
            }
        );

        observer.observe(node);

        return () => {
            observer.unobserve(node);
        };
    }, [node, callback, options]);

    return [setNode, isIntersecting];
};
