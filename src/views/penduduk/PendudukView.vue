<script setup>
const dummyData = [
  { nik: '3201010101900001', nama: 'Asep Saepudin', alamat: 'Jl. Raya Cimenyan No 1', status: 'Aktif' },
  { nik: '3201010202900002', nama: 'Siti Aminah', alamat: 'Kp. Pasir Honje', status: 'Aktif' },
]
</script>
<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h2>Data Penduduk</h2>
        <p>Kelola data penduduk desa.</p>
      </div>
      <button class="btn">Tambah Data</button>
    </div>
    
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama Lengkap</th>
            <th>Alamat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in dummyData" :key="p.nik">
            <td>{{ p.nik }}</td>
            <td>{{ p.nama }}</td>
            <td>{{ p.alamat }}</td>
            <td>{{ p.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
