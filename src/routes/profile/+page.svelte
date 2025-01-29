<script lang="ts">
  import type { PageProps } from './$types'
  const {
    data
  }: PageProps = $props()
</script>

<h2>{data?.user?.name}</h2>
<p>xp: <strong>{data?.xp}</strong></p>
<p>bio: <strong>{data?.bio || "tidak ada bio"}</strong></p>
<a href="/profile/edit-bio">edit bio?</a>