export default function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    liveReload: true,
    host: "0.0.0.0",
    port: 8080
  });

  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory(".");
  
  eleventyConfig.addFilter("fullname", person => {
    return `${person.firstname} ${person.lastname}`;
  });

  eleventyConfig.addFilter("filter_classroom", (people, classroom) => {
    return people.filter(p => p.classroom === classroom);
  });

  eleventyConfig.addFilter("order_classroom", people => {
    const sorted = [...people].sort((a, b) => {
      const first = a.firstname.localeCompare(b.firstname, "cs-CZ");
      if (first !== 0) return first;
      return a.lastname.localeCompare(b.lastname, "cs-CZ");
    });

    return [
      ...sorted.filter(p => p.role === "teacher"),
      ...sorted.filter(p => p.role !== "teacher"),
    ];
  });

  eleventyConfig.addFilter("display_name", person => {
    if (person.role !== "teacher") {
      return `${person.firstname} ${person.lastname}`;
    }

    const initial = person.firstname?.[0] ?? "";

    return person.gender === "M"
      ? `Pan učitel ${initial}. ${person.lastname}`
      : `Paní učitelka ${initial}. ${person.lastname}`;
  });
};
