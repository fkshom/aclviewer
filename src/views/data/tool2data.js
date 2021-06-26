const Data = {
  targets: [
    { id: "a", text: "teamA" },
    { id: "b", text: "teamB" },
    { id: "c", text: "teamC" },
  ],
  templates: [
    {
      title: "title1",
      text: "The file {file} \nwas added by {username}",
      targets: ["a", "b"],
    },
    {
      title: "title2",
      text: ["The file2 {file} was2", "added2 by {username}"].join("\n"),
      targets: ["a", "c"],
    },
  ],
};
export default Data;
