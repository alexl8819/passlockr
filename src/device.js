import { setOption, getFingerprint, getFingerprintData } from '@thumbmarkjs/thumbmarkjs';

export async function collectIdentifier () {
  setOption('exclude', ['webgl', 'system.browser.version', 'system.useragent']); 
  const fpData = await getFingerprintData();
  console.log(fpData);
  return await getFingerprint();
}
