<script>
  import { db } from "./db";
  import { getRandomNames } from "./random";

  // fetch / mutate state
  let status = null;

  let friendName = "My best friend";
  let friendAge = 22;

  async function addFriend() {
    await db.friends.add({
      name: friendName,
      age: friendAge
    });
  }

  function clearItems() {
    return db.friends.clear();
  }

  async function generateRandomFriends() {
    status = "fetching";
    try {
      const names = await getRandomNames(1000);
      status = "mutating";
      await db.friends.bulkAdd(
        names.map(name => ({
          name,
          age: Math.round(Math.random() * 100)
        }))
      );
      status = "done";
    } catch (error) {
      alert(error.message || error);
    } finally {
      status = null;
    }
  }
</script>

<p style="height:10px;">{status || ""}</p>
<fieldset>
<legend>Add new friend</legend>
<label>
Name:
  <input
    type="text"
    bind:value={friendName} />
</label><br/>
<label>
Age:
  <input
    type="number"
    bind:value={friendAge} />
</label>
<br />
<button on:click={addFriend}>Add Friend</button>
</fieldset>

<button on:click={generateRandomFriends}>Generate 1000 friends</button>
<button on:click={clearItems}>Clear all data</button>

