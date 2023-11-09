export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

export function arraysMatch(arr1: number[], arr2: number[]): boolean {
  console.log('arrays match');
  // 먼저 배열 길이를 비교합니다.
  if (arr1.length !== arr2.length) return false;

  // 다음으로, 각 요소를 비교합니다.
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      // 요소가 다르면, 배열이 일치하지 않습니다.
      return false;
    }
  }

  // 모든 요소가 일치하면, 배열이 일치합니다.
  return true;
}
