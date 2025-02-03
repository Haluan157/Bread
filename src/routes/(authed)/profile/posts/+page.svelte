<script>
  import { enhance } from '$app/forms'
</script>

<form method="POST" use:enhance>
  <input name="name" placeholder="Nama Roti" required />
  <input type="number" name="price" placeholder="Harga Roti" min="500" step="500" required />
  <input name="description" placeholder="Deskripsi Roti (opsional)" />
  <button type="submit">Tambah</button>
</form>