import React from 'react';

export default function SiswaTable({ data, onEdit, onDelete, searchQuery, onSearchChange }) {
  const filteredData = data.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.kode_siswa?.toLowerCase().includes(q) ||
      item.nama_siswa?.toLowerCase().includes(q) ||
      item.jurusan_siswa?.toLowerCase().includes(q) ||
      item.alamat_siswa?.toLowerCase().includes(q)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getJurusanBadgeClass = (jurusan) => {
    switch (jurusan) {
      case 'Rekayasa Perangkat Lunak':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Teknik Komputer & Jaringan':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Multimedia':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sistem Informasi Jaringan & Aplikasi':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-semibold">
            📋
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              Daftar Siswa
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                {filteredData.length} Data
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Kelola seluruh catatan siswa terdaftar di bawah ini
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            placeholder="Cari kode, nama, jurusan..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 text-xs font-bold"
              title="Hapus pencarian"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 text-slate-600 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4">Kode Siswa</th>
              <th className="py-3 px-4">Nama Lengkap</th>
              <th className="py-3 px-4">Jurusan</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4 min-w-[180px]">Alamat</th>
              <th className="py-3 px-4 text-center w-36">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <svg className="w-10 h-10 mb-2 stroke-current opacity-60" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-slate-600">
                      {searchQuery ? 'Tidak ada data siswa yang cocok.' : 'Belum ada data siswa.'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {searchQuery ? 'Coba gunakan kata kunci pencarian yang lain.' : 'Gunakan form di atas untuk menambahkan data siswa baru.'}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => onSearchChange('')}
                        className="mt-3 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                      >
                        Reset Pencarian
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr
                  key={item.kode_siswa || idx}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-xs text-blue-700">
                    <span className="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      {item.kode_siswa}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {item.nama_siswa}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getJurusanBadgeClass(item.jurusan_siswa)}`}>
                      {item.jurusan_siswa}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">
                    {formatDate(item.tgl_siswa)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs leading-relaxed">
                    {item.alamat_siswa}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition duration-150 cursor-pointer"
                        title="Edit data siswa"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item.kode_siswa)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition duration-150 cursor-pointer"
                        title="Hapus data siswa"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan <strong>{filteredData.length}</strong> dari <strong>{data.length}</strong> total data siswa</span>
          {searchQuery && (
            <span className="italic text-slate-400">Difilter berdasarkan: "{searchQuery}"</span>
          )}
        </div>
      )}
    </div>
  );
}
