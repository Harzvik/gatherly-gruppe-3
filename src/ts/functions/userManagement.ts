/*Alex Harsvik*/

/*en veldig simpel bruker bytte funsksjon for å ersatte logg inn og sånt.
kan brukes for å teste forskjellige brukere IDer */

//defaulter til 0 (Ingen bruker).
export function getCurrentUserId(): number {
  const storedId = localStorage.getItem("gatherly_current_user");
  return storedId ? parseInt(storedId, 10) : 0;
}

export function setCurrentUserId(userId: number): void {
  localStorage.setItem("gatherly_current_user", userId.toString());
}

export function getCurrentUsername(): string {
  const userId = getCurrentUserId();
  if (userId === 0) return "Ingen bruker";
  return `Bruker ${userId}`;
}
