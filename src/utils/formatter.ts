export const formatDate = (date?: string) => {
  if (date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  } else return "TBA";
};

export function convertZeros(str: string) {
  return str.replace("0", "O");
}
