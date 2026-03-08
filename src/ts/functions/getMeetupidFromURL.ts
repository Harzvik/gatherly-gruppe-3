/*Alex Harsvik*/
export function getMeetupidFromURL(): number {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const meetupId = Number(urlParams.get("id"));

  console.log(
    `Got meetupId: ${meetupId} from URL, with type: ${typeof meetupId}`,
  );
  return meetupId;
}
