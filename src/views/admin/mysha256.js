const padding = (M) => {
    let sizeLastBlock = 64;
    const sizeMLengthBuffer = 8;
    const sizeDivision = 1;
    const sizeMaxBlock = sizeLastBlock - sizeMLengthBuffer - sizeDivision;
    const sizeM = encodeURI(M).replace(/%../g, "*").length;
    const sizeLastM = sizeM % 64;
    const isOverflow = sizeMaxBlock < sizeLastM;
    if (isOverflow)
        sizeLastBlock = 128;
    const hexStringM = Array.from((new TextEncoder()).encode(M)).map(v => v.toString(16)).join("");
    const sizeExtra = (sizeLastBlock - sizeMLengthBuffer - sizeDivision - sizeLastM) * 2;
    const hexExtraString = Array(sizeExtra).fill(0).join("");
    const hexSizeM = (sizeM * 8).toString(16);
    const hex8bytesLengthM = Array(16 - hexSizeM.length).fill(0).concat(hexSizeM).join("");
    const resultString = hexStringM + "80" + hexExtraString + hex8bytesLengthM;
    return resultString;
};
const divideM = (M) => {
    const arrayM = M.match(/.{128}/g);
    if (!arrayM)
        throw new Error("Failed to divide message");
    return arrayM;
};
const ch = (x, y, z) => ((x & y) ^ (~x & z)) >>> 0;
const maj = (x, y, z) => ((x & y) ^ (x & z) ^ (y & z)) >>> 0;
const rotr = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;
const shr = (x, n) => (x >>> n) >>> 0;
const upperSigma0 = (x) => (rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22)) >>> 0;
const upperSigma1 = (x) => (rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25)) >>> 0;
const lowerSigma0 = (x) => (rotr(x, 7) ^ rotr(x, 18) ^ shr(x, 3)) >>> 0;
const lowerSigma1 = (x) => (rotr(x, 17) ^ rotr(x, 19) ^ shr(x, 10)) >>> 0;
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
    0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
    0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
    0xc67178f2
];
const mapW = (array64, Mi) => {
    for (let i = 0; i < 64; i++) {
        const hexNum = parseInt(Mi[i], 16);
        if (i < 16) {
            array64[i] = hexNum;
            continue;
        }
        const tmp = lowerSigma1(array64[i - 2]) + array64[i - 7] + lowerSigma0(array64[i - 15]) + array64[i - 16];
        array64[i] = (tmp & 0xffffffff) >>> 0;
    }
    return array64;
};
export const computeHash = (M) => {
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const paddedString = padding(M);
    const dividedM = divideM(paddedString);
    for (let i = 0; i < dividedM.length; i++) {
        const Mi = dividedM[i].match(/.{8}/g);
        if (!Mi)
            throw new Error("Failed to divide dividedM");
        const W = mapW(Array(64), Mi);
        let [a, b, c, d, e, f, g, h] = [...H];
        for (let t = 0; t < 64; t++) {
            const T1 = ((h + upperSigma1(e) + ch(e, f, g) + K[t] + W[t]) & 0xffffffff) >>> 0;
            const T2 = ((upperSigma0(a) + maj(a, b, c)) & 0xffffffff) >>> 0;
            h = g;
            g = f;
            f = e;
            e = ((d + T1) & 0xffffffff) >>> 0;
            d = c;
            c = b;
            b = a;
            a = ((T1 + T2) & 0xffffffff) >>> 0;
        }
        H[0] = ((a + H[0]) & 0xffffffff) >>> 0;
        H[1] = ((b + H[1]) & 0xffffffff) >>> 0;
        H[2] = ((c + H[2]) & 0xffffffff) >>> 0;
        H[3] = ((d + H[3]) & 0xffffffff) >>> 0;
        H[4] = ((e + H[4]) & 0xffffffff) >>> 0;
        H[5] = ((f + H[5]) & 0xffffffff) >>> 0;
        H[6] = ((g + H[6]) & 0xffffffff) >>> 0;
        H[7] = ((h + H[7]) & 0xffffffff) >>> 0;
    }
    let result = "";
    for (let e = 0; e < H.length; e++) {
        let hashString = H[e].toString(16);
        if (hashString.length < 8) {
            const extraZeros = Array(8 - hashString.length).fill(0).join('');
            hashString = extraZeros + hashString;
        }
        result += hashString;
    }
    if (result.length !== 64)
        throw new Error("Hash result is not 32bytes");
    return result;
};