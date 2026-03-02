// Add to src/utils/personaLogic.js
export const getResumeData = (data) => {
  return {
    summary: `Results-driven developer with a focus on ${data.top_lang}. Demonstrated impact with a SkillSpectra score of ${data.points}, reflecting high community engagement and repository quality.`,
    topProjects: data.repos
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 4)
      .map(repo => ({
        name: repo.name,
        description: repo.description || "Key technical implementation.",
        tech: repo.language,
        metrics: `${repo.stars} Stars / ${repo.forks} Forks`
      })),
    coreCompetencies: [data.top_lang, "Version Control (Git)", "Open Source Contribution", "Technical Documentation"]
  };
};