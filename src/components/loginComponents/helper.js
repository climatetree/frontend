export async function* generateStoryImage(stories) {
  for (const story of stories) {
    const response = await fetch(`https://backend-mongo-stories.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(story.hyperlink)}`);
    const preview = await response.json();
    yield {
      ...story,
      image: preview.image,
    };
  }
}