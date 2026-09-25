export function project(lat, lon, width, height) {
    return {
        x: (lon + 180) / 360 * width,
        y: (90 - lat) / 180 * height,
    };
}