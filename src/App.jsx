import React, { useState, useEffect, useMemo } from 'react';
import { api } from './services/api';
import SiswaForm from './components/SiswaForm';
import SiswaTable from './components/SiswaTable';

export default function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const loadSiswa = async () => {
    try {
      setLoading(true);
      const res = await api.getAll();
      if (res.success && Array.isArray(res.data)) {
        setSiswaList(res.data);
      }
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiswa();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingSiswa) {
        await api.update(editingSiswa.kode_siswa, formData);
        showAlert(`Data ${formData.nama_siswa} berhasil diperbarui!`, 'success');
        setEditingSiswa(null);
      } else {
        await api.create(formData);
        showAlert(`Data ${formData.nama_siswa} berhasil ditambahkan!`, 'success');
      }
      loadSiswa();
    } catch (err) {
      showAlert(err.message, 'error');
    }
  };

  const handleDelete = async (kode) => {
    const konfirmasi = window.confirm(`Yakin ingin menghapus siswa dengan kode: ${kode}?`);
    if (!konfirmasi) return;

    try {
      await api.delete(kode);
      showAlert(`Siswa ${kode} berhasil dihapus!`, 'success');
      loadSiswa();
    } catch (err) {
      showAlert(err.message, 'error');
    }
  };

  const totalJurusan = useMemo(() => {
    const set = new Set(siswaList.map((s) => s.jurusan_siswa).filter(Boolean));
    return set.size;
  }, [siswaList]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Sistem Informasi Data Siswa
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Uji Sertifikasi Kompetensi FullStack Express React
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistem Siap
            </span>
            <button
              onClick={loadSiswa}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition shadow-xs disabled:opacity-50 cursor-pointer"
              title="Refresh Data"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sinkronisasi
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {alert && (
          <div
            className={`flex items-center justify-between p-4 rounded-xl border shadow-sm transition-all duration-200 ${alert.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
          >
            <div className="flex items-center gap-3">
              {alert.type === 'success' ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <span className="text-sm font-medium">{alert.message}</span>
            </div>
            <button
              onClick={() => setAlert(null)}
              className="text-slate-400 hover:text-slate-600 text-base font-bold px-2 py-1 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
              👥
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Siswa Terdaftar</p>
              <p className="text-xl font-bold text-slate-800">{siswaList.length} <span className="text-xs font-normal text-slate-500">orang</span></p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0">
              🏫
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Jurusan Terwakili</p>
              <p className="text-xl font-bold text-slate-800">{totalJurusan} <span className="text-xs font-normal text-slate-500">bidang keahlian</span></p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              📚
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status Backend</p>
              <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> API Server Port 5000
              </p>
            </div>
          </div>
        </div>

        <SiswaForm
          onSubmit={handleCreateOrUpdate}
          editingSiswa={editingSiswa}
          onCancelEdit={() => setEditingSiswa(null)}
        />

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center shadow-xs">
            <div className="inline-block w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-slate-600 font-medium">Sedang memuat data dari database...</p>
          </div>
        ) : (
          <SiswaTable
            data={siswaList}
            onEdit={(siswa) => {
              setEditingSiswa(siswa);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDelete={handleDelete}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-700">
          Aplikasi Manajemen Data Siswa Ini Dibuat Oleh Roni Kurnia
        </p>
        <p className="mt-1 text-slate-400">
          Uji Sertifikasi Kompetensi Keahlian Praktikum
        </p>
      </footer>
    </div>
  );
}
