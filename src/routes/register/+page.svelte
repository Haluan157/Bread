<script lang="ts">
  import { enhance } from '$app/forms'
</script>

<form method="POST" use:enhance>
  <input name="name" placeholder="username" maxlength="20" required />
  <input type="email" placeholder="email" name="email" required />
  <input type="password" placeholder="password" name="password" minlength="8" required />
  <button type="submit">Register</button>
</form>

<p>Punya akun? <a href="/login">Login</a></p>