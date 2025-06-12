// Tangkap data dari form saat disubmit (jika user input dari halaman 'Data Aset Baru')
const form = document.querySelector(".asset-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kode = document.getElementById("kode").value;
    const nama = document.getElementById("nama").value;
    const lokasi = document.getElementById("lokasi").value;
    const tahun = document.getElementById("tahun").value;
    const kondisi = document.getElementById("kondisi").value;
    let harga = document.getElementById("harga").value;

    // Menghapus titik atau koma yang ada di harga dan mengonversinya menjadi angka
    harga = harga.replace(/[^0-9]/g, '');  // Menghapus selain angka

    // Pastikan harga adalah angka
    if (!harga || isNaN(harga)) {
      alert("Harga harus berupa angka yang valid.");
      return;
    }

    // Format Waktu
    const now = new Date();
    const waktu =
      now.getHours().toString().padStart(2, "0") + ":" +
      now.getMinutes().toString().padStart(2, "0") + " - " +
      now.getDate().toString().padStart(2, "0") + "/" +
      (now.getMonth() + 1).toString().padStart(2, "0") + "/" +
      now.getFullYear();

    const asetBaru = { kode, nama, lokasi, tahun, kondisi, harga, waktu };

    // Simpan data ke localStorage
    let asetList = JSON.parse(localStorage.getItem('asetList')) || [];
    asetList.push(asetBaru);
    localStorage.setItem('asetList', JSON.stringify(asetList));

    alert("Data berhasil disimpan!");
  });
}

// Fungsi untuk menampilkan data yang disimpan
document.addEventListener("DOMContentLoaded", showData);

function showData() {
  const dataBody = document.getElementById("dataBody");
  if (!dataBody) return;

  let asetList = JSON.parse(localStorage.getItem('asetList')) || [];
  dataBody.innerHTML = "";  // Reset data yang ada di tabel

  asetList.forEach((aset, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${aset.kode}</td>
      <td>${aset.nama}</td>
      <td>${aset.lokasi}</td>
      <td>${aset.tahun}</td>
      <td>${aset.kondisi}</td>
      <td>${aset.waktu}</td>
      <td>Rp ${parseInt(aset.harga).toLocaleString()}</td> <!-- Menampilkan harga dengan format Rp -->
      <td>
        <button class="edit-btn" onclick="editData(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteData(${index})">Hapus</button>
      </td>
    `;
    dataBody.appendChild(row);
  });
}

// Hapus data
function deleteData(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    let asetList = JSON.parse(localStorage.getItem("asetList"));
    asetList.splice(index, 1);
    localStorage.setItem("asetList", JSON.stringify(asetList));
    showData();
  }
}

// Edit data
function editData(index) {
  let asetList = JSON.parse(localStorage.getItem("asetList"));
  const aset = asetList[index];

  const newKode = prompt("Edit Kode Aset", aset.kode);
  const newNama = prompt("Edit Nama Aset", aset.nama);
  const newLokasi = prompt("Edit Lokasi Aset", aset.lokasi);
  const newTahun = prompt("Edit Tahun Perolehan", aset.tahun);
  const newKondisi = prompt("Edit Kondisi Aset (Baik, Rusak Ringan, Rusak Berat)", aset.kondisi);
  const newHarga = prompt("Edit Harga Aset (Rp)", aset.harga);

  if (newKode && newNama && newLokasi && newTahun && newKondisi && newHarga) {
    asetList[index] = {
      kode: newKode,
      nama: newNama,
      lokasi: newLokasi,
      tahun: newTahun,
      kondisi: newKondisi,
      harga: newHarga.replace(/[^0-9]/g, ''),  // Menghapus selain angka pada harga
      waktu: new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()
    };

    localStorage.setItem("asetList", JSON.stringify(asetList));
    showData();
    alert("Data berhasil diperbarui!");
  } else {
    alert("Semua field harus diisi. Edit dibatalkan.");
  }
}


// Print Functionality
function cetakData() {
  const printContent = document.getElementById("dataTabel").outerHTML;
  const printWindow = window.open('', '', 'height=800,width=800');
  printWindow.document.write('<html><head><title>Cetak Data Aset</title>');
  printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 12px; border: 1px solid #ccc; text-align: center; } th { background-color: #0077b6; color: white; }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h1>Cetak Data Aset - SIBISET PDAM Brebes</h1>');
  printWindow.document.write(printContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

function formatHarga(input) {
  let value = input.value.replace(/\D/g, ''); // Hapus semua non-digit
  let formatted = new Intl.NumberFormat('id-ID').format(value); // Format ke ribuan
  input.value = formatted;
}
document.getElementById('harga').addEventListener('keypress', function (e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
  function formatHarga(input) {
    let value = input.value.replace(/\D/g, ''); // Hapus semua non-digit
    let formatted = new Intl.NumberFormat('id-ID').format(value); // Format ke ribuan
    input.value = formatted;
  }
  document.getElementById('harga').addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
    
});

