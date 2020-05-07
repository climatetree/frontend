export async function fetchAllMediaTypes() {
  const mediaResponse = await fetch(
    "https://climatetree-api-gateway.azurewebsites.net/stories/mediaTypes"
  );
  if (mediaResponse.ok) {
    const mediaTypes = await mediaResponse.json();
    return [
      ...mediaTypes
        .map(t => capitalize(t.mediaType))
        .filter(t => t !== "Other"),
      "Other",
    ];
  } else {
    console.error(`${res.status} ${res.statusText}`);
    return [];
  }
}

export async function fetchAllSectors() {
  const sectorResponse = await fetch(
    "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/sector"
  );
  if (sectorResponse.ok) {
    const sectors = await sectorResponse.json();
    return [...new Set(sectors.map(s => s.sector))];
  } else {
    console.error(`${res.status} ${res.statusText}`);
    return [];
  }
}

export async function fetchAllSolutions() {
  const solutionResponse = await fetch(
    "https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/all/solution"
  );
  if (solutionResponse.ok) {
    const solutions = await solutionResponse.json();
    return [...new Set(solutions.map(s => s.solution))];
  } else {
    console.error(`${res.status} ${res.statusText}`);
    return [];
  }
}

function capitalize(s) {
  return s.split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

export async function fetchTopStories(num) {
  const res = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/topStories/${num}`);
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`${res.status} ${res.statusText}`);
    return [];
  }
}

export async function fetchAllUserStories({userId, jwt}) {
  const res = await fetch(
    `https://climatetree-api-gateway.azurewebsites.net/stories/user/${userId}`,
    {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    console.error(`${res.status} ${res.statusText}`);
    return [];
  }
}