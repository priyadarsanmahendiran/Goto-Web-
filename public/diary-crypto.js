// AES-256-GCM diary encryption using Web Crypto API.
// encryptEntry / decryptEntry are exposed as globals for use by the
// IIFE-style scripts that cannot import ES modules.

(function (global) {
    'use strict';

    var _enc = new TextEncoder();
    var _dec = new TextDecoder();

    // Cache derived keys so PBKDF2 only runs once per key material per session.
    var _keyCache = new Map();

    async function _deriveKey(keyMaterial) {
        if (_keyCache.has(keyMaterial)) {
            return _keyCache.get(keyMaterial);
        }
        var raw = await crypto.subtle.importKey(
            'raw',
            _enc.encode(keyMaterial),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        var key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: _enc.encode('goto-diary-v1'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            raw,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
        _keyCache.set(keyMaterial, key);
        return key;
    }

    function _toBase64(arrayBuffer) {
        var bytes = new Uint8Array(arrayBuffer);
        var binary = '';
        for (var i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    function _fromBase64(b64) {
        return Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); });
    }

    // Returns a base64 string: 12-byte IV prepended to AES-GCM ciphertext.
    global.encryptEntry = async function (plaintext, keyMaterial) {
        var key = await _deriveKey(keyMaterial);
        var iv = crypto.getRandomValues(new Uint8Array(12));
        var ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            _enc.encode(plaintext)
        );
        var buf = new Uint8Array(12 + ciphertext.byteLength);
        buf.set(iv, 0);
        buf.set(new Uint8Array(ciphertext), 12);
        return _toBase64(buf.buffer);
    };

    // Returns decrypted plaintext. Falls back to the raw value for legacy
    // plaintext entries that predate encryption.
    global.decryptEntry = async function (encoded, keyMaterial) {
        if (!encoded) return '';
        try {
            var buf = _fromBase64(encoded);
            var key = await _deriveKey(keyMaterial);
            var decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: buf.slice(0, 12) },
                key,
                buf.slice(12)
            );
            return _dec.decode(decrypted);
        } catch (_) {
            // Legacy plaintext — return as-is so old entries remain readable.
            return encoded;
        }
    };
}(window));
