/** 0 → "01": numbers the groups (01 to 04) and the services inside each group (01 to 06). */
export const twoDigits = (index: number) => String(index + 1).padStart(2, "0");
