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