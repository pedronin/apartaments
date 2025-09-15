// Имитация "бэкенда"
export async function fetchFilterLimitsFromServer() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    price: { min: 1000000, max: 20000000 },
    area: { min: 30, max: 150 },
    rooms: { min: 1, max: 5 },
  };
}
