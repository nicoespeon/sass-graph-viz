import { Node } from "vis";

const neutral: Node["color"] = {
  background: "#CCC",
  border: "#BBB",
  highlight: { background: "#CCC", border: "#BBB" },
};

const valid: Node["color"] = {
  background: "#9edb9b",
  border: "#57cc45",
  highlight: { background: "#9edb9b", border: "#57cc45" },
};

const suspicious: Node["color"] = {
  background: "#db9b9b",
  border: "#cc4545",
  highlight: { background: "#db9b9b", border: "#cc4545" },
};

export const colors = {
  file: neutral,
  partial: valid,
  orphanPartial: suspicious,
};
