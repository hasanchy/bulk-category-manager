export const darkenColor = (hex, amount = 20) => {
    let col = hex.startsWith('#') ? hex.slice(1) : hex;

    if (col.length === 3) {
        col = col.split('').map(c => c + c).join('');
    }

    const num = parseInt(col, 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00FF) - amount;
    let b = (num & 0x0000FF) - amount;

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}