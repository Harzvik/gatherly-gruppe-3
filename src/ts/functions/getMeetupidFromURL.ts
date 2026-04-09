/*Alex Harsvik*/
export function getMeetupIdFromUrl(): number | null {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idParam = urlParams.get("id");
  if (!idParam) {
    return null;
  }
  const meetupId = Number(idParam);

  if (!Number.isInteger(meetupId) || meetupId <= 0) {
    return null;
  }

  return meetupId;
}
