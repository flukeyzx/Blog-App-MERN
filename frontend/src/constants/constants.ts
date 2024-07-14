export const imageURL = "http://localhost:3000/uploads/";

export const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  ["link"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [
    {
      color: [
        "red",
        "yellow",
        "blue",
        "green",
        "crimson",
        "greenyellow",
        "gold",
        "orange",
        "cyan",
        "lightblue",
        "gray",
        "lightblue",
        "darkblue",
        "purple",
        "pink",
      ],
    },
    {
      background: [
        "red",
        "yellow",
        "blue",
        "green",
        "crimson",
        "greenyellow",
        "gold",
        "orange",
        "cyan",
        "lightblue",
        "gray",
        "lightblue",
        "darkblue",
        "purple",
        "pink",
      ],
    },
  ],
  [
    {
      font: ["sans-serif", "serif", "monospace"],
    },
  ],
  [{ align: ["justify", "right", "center"] }],
];
