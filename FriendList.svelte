<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";
  import FriendCount from "./FriendCount";

  // Query parameters:
  let namePattern = "";
  let minAge = 18;
  let maxAge = 65;
  let orderBy = "age";
  let offset = 0;
  let pageSize = 25;

  $: {
    // When any query parameter change...
    orderBy;
    minAge;
    maxAge;
    namePattern;
    // Reset paging:
    offset = 0;
  }
  //
  // Query
  //
  $: friends = liveQuery(async () => {
    if (orderBy === "age") {
      const friends = await db.friends
        .where("age")
        .between(minAge || 0, maxAge || Infinity, true, true)
        .filter(friend =>
          friend.name.toLowerCase().startsWith(namePattern.toLowerCase())
        )
        .offset(offset)
        .limit(pageSize)
        .toArray();
      return friends;
    } else if (orderBy === "name") {
      const friends = await db.friends
        .where("name")
        .startsWithIgnoreCase(namePattern)
        .filter(friend => friend.age >= minAge && friend.age <= maxAge)
        .offset(offset)
        .limit(pageSize)
        .toArray();
      return friends;
    }
  });
</script>
<fieldset>
  <legend>Query Parameters:</legend>
<label>
  Beginning of name:
  <input
    type="text"
    bind:value={namePattern} />
</label>
<label>
  Minimum age:
  <input
    type="number"
    bind:value={minAge} />
</label>
<label>
  Maximum age:
  <input
    type="number"
    bind:value={maxAge} />
</label>
<label>
  Order by:
  <input
    type="radio"
    value="age"
    bind:group={orderBy} /> Age
  <input
    type="radio"
    value="name"
    bind:group={orderBy} /> Name
</label>
</fieldset>

<FriendCount />

{#if $friends}
  <ul>
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  </ul>
{/if}

<!-- Pagination -->
<button on:click={()=>offset = 0}
  disabled={offset === 0}>
  &lt;&lt; First page
</button>
<button on:click={()=>offset -= pageSize}
  disabled={offset === 0}>
  &lt; Previous page
</button>
{#if ($friends?.length === pageSize)}
<button on:click={()=>offset += pageSize}>
  Next page >
</button>
{/if}

<style>
  input:not([type="radio"]) {
    display: block;
  }
</style>
