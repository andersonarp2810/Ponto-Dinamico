/**
 * ## Module / SHA2
 *
 * Implements the SHA-2 hashing algorithm which is a set of [cryptographic hash functions](http://en.wikipedia.org/wiki/Cryptographic_hash_function). Cryptographic hash functions are mathematical operations run on digital data. By comparing the computed hash to a known and expected hash value, a person can determine the data's integrity. A key aspect of cryptographic hash functions is their one-way nature: given only a computed hash value, it is generally impossible to derive the original data. The SHA-2 family consists of six hash functions with digests (hash values) that are 224, 256, 384 or 512 bits: SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, SHA-512/256.
 *
 * SHA-256 and SHA-512 are novel hash functions computed with 32-bit and 64-bit words, respectively. They use different shift amounts and additive constants, but their structures are otherwise virtually identical, differing only in the number of rounds. SHA-224 and SHA-384 are simply truncated versions of the first two, computed with different initial values. SHA-512/224 and SHA-512/256 are also truncated versions of SHA-512, but the initial values are generated using the method described in FIPS PUB 180-4.
 *
 * Source: http://en.wikipedia.org/wiki/SHA-2
 * Author: Mark van den Brink (mark@askaround.nl)
 * License: http://www.opensource.org/licenses/MIT
 */
"use strict";
/**
 * Hash values for SHA-224 (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19).
 */
var HASH_224 = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
/**
 * Hash values for SHA-256 (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19).
 */
var HASH_256 = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
/**
 * Hash values for SHA-384 (64 bit fractional part of the square roots of the first 8 primes 2..19).
 */
var HASH_384 = [0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17, 0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511, 0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4];
/**
 * Hash values for SHA-512 (64 bit fractional part of the square roots of the first 8 primes 2..19).
 */
var HASH_512 = [0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179];
/**
 * Hash values for SHA-512/224 (64 bit fractional part of the square roots of the first 8 primes 2..19).
 */
var HASH_512_224 = [0x8C3D37C8, 0x19544DA2, 0x73E19966, 0x89DCD4D6, 0x1DFAB7AE, 0x32FF9C82, 0x679DD514, 0x582F9FCF, 0x0F6D2B69, 0x7BD44DA8, 0x77E36F73, 0x04C48942, 0x3F9D85A8, 0x6A1D36C8, 0x1112E6AD, 0x91D692A1];
/**
 * Hash values for SHA-512/256 (64 bit fractional part of the square roots of the first 8 primes 2..19).
 */
var HASH_512_256 = [0x22312194, 0xFC2BF72C, 0x9F555FA3, 0xC84C64C2, 0x2393B86B, 0x6F53B151, 0x96387719, 0x5940EABD, 0x96283EE2, 0xA88EFFE3, 0xBE5E1E25, 0x53863992, 0x2B0199FC, 0x2C85B8AA, 0x0EB72DDC, 0x81C52CA2];
/**
 * SHA-256 round constants (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311).
 */
var ROUNDS_256 = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];
/**
 * SHA-512 round constants (first 64 bits of the fractional parts of the cube roots of the first 80 primes 2..409).
 */
var ROUNDS_512 = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];
/**
 * Contains the hex digits.
 */
var HEX_DIGITS = "0123456789abcdef";
/**
 * Right-rotate a byte with the specified number of shifts.
 * @param nValue Specifies the byte value.
 * @param nShifts Specifies the number of shifts.
 * @returns Returns the rotated value.
 */
function Rotate(nValue, nShifts) {
    "use strict";
    return (nValue >>> nShifts) | (nValue << (32 - nShifts));
}
/**
 * Calculates the sigma.
 * @param nValue Specifies the value.
 * @param nA Specifies the number of shifts for the first rotation.
 * @param nB Specifies the number of shifts for the second rotation.
 * @param nC Specifies the right shift.
 * @returns Returns the sigma.
 */
function Sigma(nValue, nA, nB, nC) {
    "use strict";
    return Rotate(nValue, nA) ^ Rotate(nValue, nB) ^ (nValue >>> nC);
}
/**
 * Calculates the sum.
 * @param pWords Reference to the words.
 * @param nIndex Specifies the index.
 * @returns Returns the sum.
 */
function Sum(pWords, nIndex) {
    "use strict";
    return pWords[nIndex & 0x0f] += Sigma(pWords[(nIndex + 14) & 0x0f], 17, 19, 10) + pWords[(nIndex + 9) & 0x0f] + Sigma(pWords[(nIndex + 1) & 0x0f], 7, 18, 3);
}
/**
 * Aggregates two inputs.
 * @param nA Input A.
 * @param nB Input B.
 * @returns Returns the aggregated value.
 */
function Aggregate(nA, nB) {
    "use strict";
    var nC = (nA & 0xffff) + (nB & 0xffff);
    nB = (nA >> 16) + (nB >> 16) + (nC >> 16);
    return (nB << 16) | (nC & 0xffff);
}
/**
 * Conglomerates inputs to the buffer.
 * @param pBuffer Reference to the buffer.
 * @param nOffset Specifies the buffer offset.
 * @param pInputs Specifies the inputs.
 */
function Conglomerate(pBuffer, nOffset) {
    "use strict";
    var pInputs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        pInputs[_i - 2] = arguments[_i];
    }
    var nInput = 0;
    var nValue = 0;
    var nA = 0;
    var nB = 0;
    for (; nInput < pInputs.length / 2; nInput++) {
        nValue = pInputs[nInput];
        nA += nValue & 0xffff;
        nB += nValue >>> 16;
    }
    nB += nA >>> 16;
    pBuffer[nOffset + 1] = (nB << 16) | (nA & 0xffff);
    nA = nB >>> 16;
    nB = 0;
    for (; nInput < pInputs.length; nInput++) {
        nValue = pInputs[nInput];
        nA += nValue & 0xffff;
        nB += nValue >>> 16;
    }
    nB += nA >>> 16;
    pBuffer[nOffset] = (nB << 16) | (nA & 0xffff);
}
/**
 * Compress the specified buffer to the hash.
 * @param pHash Reference to the hash data.
 * @param pBuffer Reference to the buffer data.
 */
function Compress(pHash, pBuffer) {
    "use strict";
    var pIntermediate = [pHash[0], pHash[1], pHash[2], pHash[3], pHash[4], pHash[5], pHash[6], pHash[7]];
    var pWords = [];
    var nIndex = 0;
    while (nIndex < 16) {
        pWords[nIndex] = pBuffer[(nIndex << 2) + 3] | (pBuffer[(nIndex << 2) + 2] << 8) | (pBuffer[(nIndex << 2) + 1] << 16) | (pBuffer[nIndex << 2] << 24);
        nIndex++;
    }
    for (nIndex = 0; nIndex < 64; nIndex++) {
        var nT0 = pIntermediate[0];
        var nT1 = pIntermediate[1];
        var nT2 = pIntermediate[2];
        var nT4 = pIntermediate[4];
        var nT = pIntermediate[7] + (Rotate(nT4, 6) ^ Rotate(nT4, 11) ^ Rotate(nT4, 25)) + ((nT4 & pIntermediate[5]) ^ (~nT4 & pIntermediate[6])) + ROUNDS_256[nIndex] + (nIndex < 16 ? pWords[nIndex] : Sum(pWords, nIndex));
        for (var nIntermediate = 7; nIntermediate >= 0; nIntermediate--) {
            pIntermediate[nIntermediate] = nIntermediate === 4 ? Aggregate(pIntermediate[3], nT) : nIntermediate === 0 ? Aggregate(nT, (Rotate(nT0, 2) ^ Rotate(nT0, 13) ^ Rotate(nT0, 22)) + ((nT0 & nT1) ^ (nT0 & nT2) ^ (nT1 & nT2))) : pIntermediate[nIntermediate - 1];
        }
    }
    for (nIndex = 0; nIndex < 8; nIndex++) {
        pHash[nIndex] += pIntermediate[nIndex];
    }
}
/**
 * Hashes the supplied string data using SHA-256 or SHA-512.
 * @param sData Specifies the data to hash.
 * @param bHash512 Specifies if SHA-512 instead of SHA-256 should be used.
 * @param nBits Specifies the number of bits of the digests.
 * @returns Returns the hash string.
 */
function Hash(sData, bHash512, nBits) {
    "use strict";
    var sHash = "";
    var pHash = (bHash512 ? (nBits === 224 ? HASH_512_224 : nBits === 256 ? HASH_512_256 : nBits === 384 ? HASH_384 : HASH_512) : (nBits === 224 ? HASH_224 : HASH_256)).slice();
    var nLength = typeof sData === "string" ? sData.length : 0;
    var pBuffer = [];
    var nBuffer = 0;
    var bBuffer = true;
    var nIndex = 0;
    var nPosition = 0;
    var nOffset = 0;
    var nCountA = 0;
    var nCountB = 0;
    var nA;
    var nB;
    if (bHash512) {
        var pExpand = [0, 0, 0, 0, 0, 0, 0, 0];
        var pShift = [24, 16, 8, 0];
        var pIntermediate;
        do {
            pBuffer[0] = nBuffer;
            for (nA = 1; nA <= 32; nA++) {
                pBuffer[nA] = 0;
            }
            for (nA = nOffset; nIndex < nLength && nA < 128; ++nIndex) {
                var nChar = sData.charCodeAt(nIndex);
                if (nChar < 0x80) {
                    pBuffer[nA >> 2] |= nChar << pShift[nA++ & 3];
                }
                else if (nChar < 0x800) {
                    pBuffer[nA >> 2] |= (0xc0 | (nChar >> 6)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | (nChar & 0x3f)) << pShift[nA++ & 3];
                }
                else if (nChar < 0xd800 || nChar >= 0xe000) {
                    pBuffer[nA >> 2] |= (0xe0 | (nChar >> 12)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | ((nChar >> 6) & 0x3f)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | (nChar & 0x3f)) << pShift[nA++ & 3];
                }
                else {
                    nChar = 0x10000 + (((nChar & 0x3ff) << 10) | (sData.charCodeAt(++nIndex) & 0x3ff));
                    pBuffer[nA >> 2] |= (0xf0 | (nChar >> 18)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | ((nChar >> 12) & 0x3f)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | ((nChar >> 6) & 0x3f)) << pShift[nA++ & 3];
                    pBuffer[nA >> 2] |= (0x80 | (nChar & 0x3f)) << pShift[nA++ & 3];
                }
            }
            nPosition += nA - nOffset;
            nOffset = nA - 128;
            if (nIndex === nLength) {
                pBuffer[nA >> 2] |= [-2147483648, 8388608, 32768, 128][nA & 3];
                ++nIndex;
            }
            nBuffer = pBuffer[32];
            if (nIndex > nLength && nA < 112) {
                pBuffer[31] = nPosition << 3;
                bBuffer = false;
            }
            for (nB = 32; nB < 160; nB += 2) {
                var nT0 = pBuffer[nB - 30];
                var nT1 = pBuffer[nB - 29];
                var nT2 = pBuffer[nB - 4];
                var nT3 = pBuffer[nB - 3];
                Conglomerate(pBuffer, nB, pBuffer[nB - 13], pBuffer[nB - 31], ((nT1 >>> 1) | (nT0 << 31)) ^ ((nT1 >>> 8) | (nT0 << 24)) ^ ((nT1 >>> 7) | nT0 << 25), ((nT3 >>> 19) | (nT2 << 13)) ^ ((nT2 >>> 29) | (nT3 << 3)) ^ ((nT3 >>> 6) | nT2 << 26), pBuffer[nB - 14], pBuffer[nB - 32], ((nT0 >>> 1) | (nT1 << 31)) ^ ((nT0 >>> 8) | (nT1 << 24)) ^ (nT0 >>> 7), ((nT2 >>> 19) | (nT3 << 13)) ^ ((nT3 >>> 29) | (nT2 << 3)) ^ (nT2 >>> 6));
            }
            pIntermediate = pHash.slice();
            pExpand[6] = pIntermediate[2] & pIntermediate[4];
            pExpand[7] = pIntermediate[3] & pIntermediate[5];
            for (nA = 0; nA < 160; nA += 8) {
                for (nB = 0; nB < 8; nB += 2) {
                    var nShift = nB > 0 ? 8 - nB : 0;
                    var pSum = [0, 0, 0, 0];
                    Conglomerate(pSum, 0, ROUNDS_512[nA + nB + 1], pBuffer[nA + nB + 1], (pIntermediate[9 + nShift] & pIntermediate[nB === 2 ? 9 : 11 + nShift]) ^ (~pIntermediate[9 + nShift] & pIntermediate[nB === 6 ? 15 : 13 - nB]), ((pIntermediate[9 + nShift] >>> 14) | (pIntermediate[8 + nShift] << 18)) ^ ((pIntermediate[9 + nShift] >>> 18) | (pIntermediate[8 + nShift] << 14)) ^ ((pIntermediate[8 + nShift] >>> 9) | (pIntermediate[9 + nShift] << 23)), pIntermediate[15 - nB], ROUNDS_512[nA + nB], pBuffer[nA + nB], (pIntermediate[8 + nShift] & pIntermediate[nB === 2 ? 8 : 10 + nShift]) ^ (~pIntermediate[8 + nShift] & pIntermediate[nB === 6 ? 14 : 12 - nB]), ((pIntermediate[8 + nShift] >>> 14) | (pIntermediate[9 + nShift] << 18)) ^ ((pIntermediate[8 + nShift] >>> 18) | (pIntermediate[9 + nShift] << 14)) ^ ((pIntermediate[9 + nShift] >>> 9) | (pIntermediate[8 + nShift] << 23)), pIntermediate[14 - nB]);
                    Conglomerate(pSum, 2, (pExpand[nB + 1] = pIntermediate[1 + nShift] & pIntermediate[nB === 2 ? 1 : 3 + nShift]) ^ (pIntermediate[1 + nShift] & pIntermediate[(nB === 6 ? nB : 4 - nB) + 1]) ^ pExpand[7 - nShift], ((pIntermediate[1 + nShift] >>> 28) | (pIntermediate[nShift] << 4)) ^ ((pIntermediate[nShift] >>> 2) | (pIntermediate[1 + nShift] << 30)) ^ ((pIntermediate[nShift] >>> 7) | (pIntermediate[1 + nShift] << 25)), (pExpand[nB] = pIntermediate[nShift] & pIntermediate[nB === 2 ? 0 : 2 + nShift]) ^ (pIntermediate[nShift] & pIntermediate[nB === 6 ? nB : 4 - nB]) ^ pExpand[6 - nShift], ((pIntermediate[nShift] >>> 28) | (pIntermediate[1 + nShift] << 4)) ^ ((pIntermediate[1 + nShift] >>> 2) | (pIntermediate[nShift] << 30)) ^ ((pIntermediate[1 + nShift] >>> 7) | (pIntermediate[nShift] << 25)));
                    Conglomerate(pIntermediate, 14 - nB, pIntermediate[7 - nB], pSum[1], pIntermediate[6 - nB], pSum[0]);
                    Conglomerate(pIntermediate, 6 - nB, pSum[3], pSum[1], pSum[2], pSum[0]);
                }
            }
            for (nA = 0; nA < 16; nA += 2) {
                Conglomerate(pHash, nA, pHash[nA + 1], pIntermediate[nA + 1], pHash[nA], pIntermediate[nA]);
            }
        } while (bBuffer);
    }
    else {
        nIndex = ((nCountA >> 3) & 0x3f);
        nOffset = nLength & 0x3f;
        if ((nCountA += (nLength << 3)) < (nLength << 3)) {
            nCountB++;
        }
        nCountB += nLength >> 29;
        for (nA = 0; nA + 63 < nLength; nA += 64) {
            for (nB = nIndex; nB < 64; nB++) {
                pBuffer[nB] = sData.charCodeAt(nPosition++);
            }
            Compress(pHash, pBuffer);
            nIndex = 0;
        }
        for (nA = 0; nA < nOffset; nA++) {
            pBuffer[nA] = sData.charCodeAt(nPosition++);
        }
        nIndex = ((nCountA >> 3) & 0x3f);
        pBuffer[nIndex++] = 0x80;
        for (nA = nIndex; nA < (nIndex > 56 ? 64 : 56); nA++) {
            pBuffer[nA] = 0;
        }
        if (nIndex > 56) {
            Compress(pHash, pBuffer);
            for (nA = 0; nA < 56; nA++) {
                pBuffer[nA] = 0;
            }
        }
        while (nA < 64) {
            for (nB = 24; nB >= 0; nB -= 8, nA++) {
                pBuffer[nA] = ((nA >= 60 ? nCountA : nCountB) >>> nB) & 0xff;
            }
        }
        Compress(pHash, pBuffer);
    }
    for (nA = 0; nA < (nBits === 512 ? 16 : nBits === 384 ? 12 : nBits === 256 ? 8 : 7); nA++) {
        for (nB = 28; nB >= 0; nB -= 4) {
            sHash += HEX_DIGITS.charAt((pHash[nA] >>> nB) & 0x0f);
        }
    }
    return sHash;
}
/**
 * Hashes the supplied string data using SHA2-224.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_224(sData) {
    "use strict";
    return Hash(sData, false, 224);
}
/**
 * Hashes the supplied string data using SHA2-256.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_256(sData) {
    "use strict";
    return Hash(sData, false, 256);
}
/**
 * Hashes the supplied string data using SHA2-384.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_384(sData) {
    "use strict";
    return Hash(sData, true, 384);
}
/**
 * Hashes the supplied string data using SHA2-512.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_512(sData) {
    "use strict";
    return Hash(sData, true, 512);
}
/**
 * Hashes the supplied string data using SHA2-512/224.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_512_224(sData) {
    "use strict";
    return Hash(sData, true, 224);
}
/**
 * Hashes the supplied string data using SHA2-512/256.
 * @param sData Specifies the data to hash.
 * @returns Returns the hash string.
 */
function SHA2_512_256(sData) {
    "use strict";
    return Hash(sData, true, 256);
}
