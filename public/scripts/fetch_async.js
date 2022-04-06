export async function fetchAsync(url) {
  try {
    const response = await fetch(url);

    const contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unhandled contentType " + contentType);
    }
  } catch (error) {
    throw error;
  }
}
