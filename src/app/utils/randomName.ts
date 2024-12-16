export function randomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
