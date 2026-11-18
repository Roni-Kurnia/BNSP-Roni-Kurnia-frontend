const BASE_URL = 'http://localhost:5000/api/siswa';

export const api = {
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Gagal memuat data siswa');
    return res.json();
  },

  async getByKode(kode) {
    const res = await fetch(`${BASE_URL}/${kode}`);
    if (!res.ok) throw new Error('Siswa tidak ditemukan');
    return res.json();
  },

  async create(data) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menambahkan data siswa');
    return result;
  },

  async update(kode, data) {
    const res = await fetch(`${BASE_URL}/${kode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui data siswa');
    return result;
  },

  async delete(kode) {
    const res = await fetch(`${BASE_URL}/${kode}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus data siswa');
    return result;
  }
};
