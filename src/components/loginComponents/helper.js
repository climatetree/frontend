export async function fetchAllMediaTypes() {
  try {
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
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchAllSectors() {
  try {
    const sectorResponse = await fetch(
      "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/sector"
    );
    const sectors = await sectorResponse.json();
    return [...new Set(sectors.map(s => s.sector))];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchAllSolutions() {
  try {
    const solutionResponse = await fetch(
      "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/solution"
    );
    const solutions = await solutionResponse.json();
    return [...new Set(solutions.map(s => s.solution))];
  } catch (error) {
    console.log(error);
    return [];
  }
}

function capitalize(s) {
  return s.split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

export async function fetchTopStories(num) {
  try {
    const res = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/topStories/${num}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchAllUserStories({userId, jwt}) {
  try {
    const res = await fetch(
      `https://climatetree-api-gateway.azurewebsites.net/stories/user/${userId}`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}