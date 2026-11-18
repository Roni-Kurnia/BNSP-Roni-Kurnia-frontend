import React, { useState, useEffect } from 'react';

export default function SiswaForm({ onSubmit, editingSiswa, onCancelEdit }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: ''
  });

  useEffect(() => {
    if (editingSiswa) {
      const tgl = editingSiswa.tgl_siswa ? editingSiswa.tgl_siswa.split('T')[0] : '';
      setFormData({
        kode_siswa: editingSiswa.kode_siswa || '',
        nama_siswa: editingSiswa.nama_siswa || '',
        alamat_siswa: editingSiswa.alamat_siswa || '',
        tgl_siswa: tgl,
        jurusan_siswa: editingSiswa.jurusan_siswa || ''
      });
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: ''
      });
    }
  }, [editingSiswa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.kode_siswa || !formData.nama_siswa || !formData.alamat_siswa || !formData.tgl_siswa || !formData.jurusan_siswa) {
      alert('Mohon lengkapi semua kolom formulir!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 shadow-xs ${editingSiswa ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200/90'
      }`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${editingSiswa ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
            }`}>
            {editingSiswa ? '✏️' : '➕'}
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              {editingSiswa ? 'Edit Informasi Siswa' : 'Tambah Data Siswa'}
            </h2>
            <p className="text-xs text-slate-500">
              {editingSiswa ? `Memperbarui data siswa dengan kode ${editingSiswa.kode_siswa}` : 'Isi formulir berikut untuk mendaftarkan data siswa baru'}
            </p>
          </div>
        </div>

        {editingSiswa && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Mode Edit
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Kode Siswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="kode_siswa"
              value={formData.kode_siswa}
              onChange={handleChange}
              placeholder="Contoh: SIS-001"
              disabled={!!editingSiswa}
              className={`w-full px-3 py-2 text-sm rounded-lg border transition duration-150 ${editingSiswa
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
                }`}
              required
            />
            {editingSiswa && (
              <p className="text-[11px] text-amber-600 mt-1 font-medium">
                *Kode siswa bersifat unik dan tidak dapat diubah
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Nama Lengkap Siswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="nama_siswa"
              value={formData.nama_siswa}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Tanggal Terdaftar / Lahir <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="tgl_siswa"
              value={formData.tgl_siswa}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Jurusan <span className="text-rose-500">*</span>
            </label>
            <select
              name="jurusan_siswa"
              value={formData.jurusan_siswa}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition duration-150"
              required
            >
              <option value="">-- Pilih Jurusan --</option>
              <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
              <option value="Teknik Komputer & Jaringan">Teknik Komputer & Jaringan</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Sistem Informasi Jaringan & Aplikasi">Sistem Informasi Jaringan & Aplikasi</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Alamat Domisili Siswa <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="alamat_siswa"
            value={formData.alamat_siswa}
            onChange={handleChange}
            rows="2"
            placeholder="Tuliskan alamat lengkap siswa (nama jalan, nomor rumah, kota/kabupaten)..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition duration-150"
            required
          />
        </div>

        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow transition duration-150 cursor-pointer"
          >
            {editingSiswa ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Siswa
              </>
            )}
          </button>

          {editingSiswa && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition duration-150 cursor-pointer"
            >
              Batalkan
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
