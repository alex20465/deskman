

import * as crypto from 'crypto';

export function getFingerprint(certString: string) {
    const baseString = certString.match(
        /-----BEGIN CERTIFICATE-----\s*([\s\S]+?)\s*-----END CERTIFICATE-----/i,
    );
    const rawCert = Buffer.from(baseString[1], 'base64');
    const sha256sum = crypto.createHash('sha256').update(rawCert).digest('hex');
    return sha256sum.toUpperCase().replace(/(.{2})(?!$)/g, '$1:');
}
