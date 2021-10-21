<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";

  let numFriends = liveQuery(async () => {
    status = "counting";
    try {
      const result = await db.friends.count();
      return result;
    } catch (error) {
      throw error;
    }
  });
</script>

<p>Total number of friends: {$numFriends ?? "loading"}</p>
