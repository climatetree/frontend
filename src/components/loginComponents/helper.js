export async function* generateStoryImage(stories) {
  for (const story of stories) {
    const response = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(story.hyperlink)}`);
    const preview = await response.json();
    yield {
      ...story,
      image: preview.image,
    };
  }
}

export async function fetchAllMediaTypes() {
  const mediaResponse = await fetch(
    "https://climatetree-api-gateway.azurewebsites.net/stories/mediaTypes"
  );
  const mediaTypes = await mediaResponse.json();
  return [
    ...mediaTypes
      .map(t => capitalize(t.mediaType))
      .filter(t => t !== "Other"),
    "Other",
  ];
}

export async function fetchAllSectors() {
  const sectorResponse = await fetch(
    // "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/sector"
    "https://backend-mongo-stories.azurewebsites.net/v1/stories/taxonomy/all/sector"
  );
  const sectors = await sectorResponse.json();
  return [...new Set(sectors.map(s => s.sector))];
}

export async function fetchAllSolutions() {
  const solutionResponse = await fetch(
    // "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/solution"
    "https://backend-mongo-stories.azurewebsites.net/v1/stories/taxonomy/all/solution"
  );
  const solutions = await solutionResponse.json();
  return [...new Set(solutions.map(s => s.solution))];
}

function capitalize(s) {
  return s.split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}