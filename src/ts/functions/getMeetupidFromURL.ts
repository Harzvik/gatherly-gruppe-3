/*Alex Harsvik*/
export function getMeetupIdFromUrl(): number {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const meetupId = Number(urlParams.get("id"));

  return meetupId;
}
