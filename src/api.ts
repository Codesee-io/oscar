import axios from "axios";
import { db } from "./database";

const USERS_COLLECTION = "users";

type User = {
  uid: string;
  discordUserId: string;
};

/**
 * Returns a user with a matching discordUserId in our database, or `null` if
 * none is found.
 */
export async function getUserByDiscordId(discordUserId: string) {
  const result = await db
    .collection(USERS_COLLECTION)
    .where("discordUserId", "==", discordUserId)
    .get();

  if (result.empty) {
    return null;
  } else {
    const matchingUser = result.docs[0].data() as User;
    return matchingUser;
  }
}

/**
 * Returns `true` if the user provided is considered a maintainer of OSH, or
 * `false` otherwise.
 */
export async function isUserMaintainer(user: User): Promise<boolean> {
  return axios
    .post(
      process.env.MAINTAINER_ENDPOINT_URL,
      { userId: user.uid },
      {
        headers: {
          Authorization: `Bearer ${process.env.BOT_API_KEY}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        const { isMaintainer } = response.data;
        return isMaintainer as boolean;
      } else {
        return false;
      }
    })
    .catch(() => false);
}
