import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

const API_ENDPOINT = "https://my-worker.youssef-worker.workers.dev/posts";
export { theme, months, API_ENDPOINT };
