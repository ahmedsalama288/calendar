import { StoredEvent, User } from "../types/types";

function getLocalStorageObjByKey(itemKey: string) {
  const object = localStorage.getItem(itemKey);
  if (!object) return null;

  return JSON.parse(object);
}

export function addUser(username: string, email: string) {
  const user: User = {
    username,
    email,
    events: [],
  };
  const users: User[] | null = getLocalStorageObjByKey("users");
  console.log(users);

  // if there is no user create new one
  if (!users) {
    const newUsersArray = JSON.stringify([user]);
    localStorage.setItem("users", newUsersArray);
    return;
  }

  const isUserExist = users.find((user) => user.email === email);

  if (!isUserExist) {
    const newUsersArray = JSON.stringify(users.concat(user));
    localStorage.setItem("users", newUsersArray);
  }
}

export function getUsersAndUserData(userEmail: string) {
  const users: User[] = getLocalStorageObjByKey("users");
  const user = users.find((user) => user.email === userEmail);

  return { user, users };
}

export function getUserEvents(userEmail: string) {
  const users: User[] = getLocalStorageObjByKey("users");
  if (!users) return [];
  const user = users.find((user) => user.email === userEmail);
  if (!user) return [];

  const userEvents = user.events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return userEvents;
}

export function addNewEvent(userEmail: string, newEvent: StoredEvent) {
  const { user, users } = getUsersAndUserData(userEmail);
  if (!user) return;
  const newEventsArr = user.events.concat(newEvent);

  const newUsers = users.map((userObj) => {
    if (userObj.email === user.email) {
      userObj.events = newEventsArr;
    }
    return userObj;
  });

  localStorage.setItem("users", JSON.stringify(newUsers));
}

// export function editEvent(userEmail: string, event: StoredEvent) {
//   const users: User[] = getLocalStorageObjByKey("users");

//   const newUsers = users.map((user) => {
//     if (user.email === userEmail) {
//       user.events = user.events.map((userEvent) => {
//         if (userEvent.id === event.id) {
//           userEvent = { ...event };
//         }
//         return userEvent;
//       });
//     }

//     return user;
//   });

//   localStorage.setItem("users", JSON.stringify(newUsers));
// }

export function editEvent(userEmail: string, event: StoredEvent) {
  const users: User[] = getLocalStorageObjByKey("users");

  const newUsers = users.map((user) => {
    if (user.email !== userEmail) return user;

    const updatedEvents = user.events.map((userEvent) =>
      userEvent.id === event.id ? { ...userEvent, ...event } : userEvent
    );

    return { ...user, events: updatedEvents };
  });

  localStorage.setItem("users", JSON.stringify(newUsers));
}
