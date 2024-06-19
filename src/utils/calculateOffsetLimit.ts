function calculateOffsetLimit(pc: number, tab: number, mob: number) {
  if (window.innerWidth > 1024) {
    return pc;
  }
  if (window.innerWidth > 769) {
    return tab;
  }
  return mob;
}

export default calculateOffsetLimit;
