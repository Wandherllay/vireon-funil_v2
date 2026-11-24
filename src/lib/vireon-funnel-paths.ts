export function isFunnelEntry(path: string) {
  const pathname = path.replace(/\/$/, '');
  return pathname === '/v2' || pathname === '/v2/quiz' || pathname === '/v2/landing';
}
