export function initializeBoard(columns: number, rows: number): string[][] {
  return Array.from(Array(rows)).map((i) => Array.from(Array(columns)));
}

export function initializeTokens(p1: string, p2: string) {
  return Array.from(Array(42)).map((item, i) => {
    const token = {
      active: false,
      top: -50,
      offset: 0,
      playerTag: i % 2 === 0 ? p1 : p2,
    };
    if (i === 0) token.active = true;
    return token;
  });
}
