'use strict';

const chapters = [
  {id:'membaca',title:'Membaca file',short:'Baca file',icon:'↳',time:'8 menit',description:'Buka file, baca isinya, lalu kenali cara memisahkan data.'},
  {id:'menulis',title:'Menulis file',short:'Tulis file',icon:'↗',time:'8 menit',description:'Simpan data ke TXT dan CSV dengan separator yang tepat.'},
  {id:'modul',title:'Mengenal modul',short:'Modul Python',icon:'{ }',time:'10 menit',description:'Bagi program menjadi beberapa file agar lebih mudah dirawat.'},
  {id:'exception',title:'Try & except',short:'Try & except',icon:'!_',time:'7 menit',description:'Tangani kesalahan agar program bisa memberi pesan yang jelas.'}
];
let completed = [];
try { const saved = JSON.parse(localStorage.getItem('python-pelan-progress') || '[]'); if (Array.isArray(saved)) completed = [...new Set(saved.filter(x => chapters.some(c => c.id === x)))]; } catch {}
const main = document.querySelector('#main');
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const codeStore = new Map();
let codeIndex = 0;
function highlight(code) {
  return code.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#[^\n]*)/g).map((part,i) => {
    if (i % 2) return `<span class="${part.startsWith('#')?'syntax-comment':'syntax-string'}">${esc(part)}</span>`;
    return esc(part).replace(/\b(import|from|with|as|for|in|def|return|if|try|except|else|finally|raise)\b/g,'<span class="syntax-keyword">$1</span>');
  }).join('');
}
function codeBlock(name, code) {
  const id = `code-${codeIndex++}`; codeStore.set(id,code);
  return `<div class="code-block"><div class="code-header"><span>${esc(name)}</span><button class="copy-button" data-copy="${id}" aria-label="Salin kode ${esc(name)}">Salin kode</button></div><pre><code>${highlight(code)}</code></pre></div>`;
}
function output(value) { return `<div class="output-label">HASIL DI TERMINAL</div><pre class="output">${esc(value)}</pre>`; }
function callout(title,text,warning=false) { return `<div class="callout${warning?' warning':''}"><span aria-hidden="true">${warning?'!':'↳'}</span><p><strong>${title}</strong><br>${text}</p></div>`; }
function exercise(title,brief,filename,code,result='') { return `<section class="exercise" id="latihan"><div class="eyebrow">GILIRAN KAMU</div><h2>${title}</h2><p>${brief}</p><details><summary>Lihat petunjuk & pembahasan</summary>${codeBlock(filename,code)}${result?output(result):''}</details></section>`; }
function renderNavigation(id) {
  document.querySelector('#navigation').innerHTML = `<a class="nav-link ${id==='beranda'?'active':''}" href="#beranda" ${id==='beranda'?'aria-current="page"':''}><span class="nav-num">⌂</span> Mulai di sini</a>` + chapters.map((c,i)=>`<a class="nav-link ${id===c.id?'active':''} ${completed.includes(c.id)?'done':''}" href="#${c.id}" ${id===c.id?'aria-current="page"':''}><span class="nav-num">${completed.includes(c.id)?'✓':String(i+1).padStart(2,'0')}</span>${c.short}</a>`).join('') + `<a class="nav-link ${id==='kuis'?'active':''}" href="#kuis" ${id==='kuis'?'aria-current="page"':''}><span class="nav-num">✧</span> Cek pemahaman</a>`;
  document.querySelector('#progress-count').textContent = `${completed.length}/4`;
  document.querySelector('#progress').value = completed.length;
  document.querySelector('#progress-note').textContent = completed.length===4?'Empat bab selesai. Coba kuisnya!':completed.length? 'Pelan-pelan, kamu makin paham.':'Mulai dari satu langkah kecil.';
}
function home() {
  return `<section class="hero"><div class="hero-copy"><div class="eyebrow">BELAJAR PYTHON, TANPA BURU-BURU</div><h1>File kecil.<br><em>Skill besar.</em></h1><p>Dari membaca file pertama sampai menangani error. Pahami file, modul, dan exception lewat contoh yang dekat dengan keseharian.</p><div class="hero-actions"><a class="button" href="#membaca">Mulai belajar <span aria-hidden="true">→</span></a><a class="quiet-link" href="#materi">Lihat materi ↓</a></div><div class="hero-meta"><span>4 bab singkat</span><span>± 35 menit</span><span>Ramah pemula</span></div></div><div class="hero-art" role="img" aria-label="Contoh Python membuka catatan.txt dengan with open dan membaca isinya."><div class="art-grid"></div><div class="art-kicker">SATU FILE. BANYAK KEMUNGKINAN.</div><span class="art-spark" aria-hidden="true">✳</span><div class="mini-editor"><div class="mini-title"><i></i><i></i><i></i><span>belajar.py</span></div><pre><span class="code-comment"># Mulai dari hal sederhana.</span>
with open(<span class="string">"catatan.txt"</span>, <span class="string">"r"</span>) as file:
    pesan = file.read()

print(pesan)
<span class="code-comment"># Halo, dunia Python!</span></pre></div><div class="file-sticker"><span class="file-icon">TXT</span><span>catatan.txt<small>Ide besarmu dimulai di sini.</small></span></div></div></section>
  <div class="intro-strip"><span><b class="strip-icon" aria-hidden="true">✓</b> <strong>Bahasa Indonesia</strong> yang mudah dipahami</span><span><b class="strip-icon" aria-hidden="true">⌘</b> Contoh kode siap dicoba</span><span><b class="strip-icon" aria-hidden="true">↗</b> Belajar sambil praktik</span></div>
  <section id="materi"><div class="section-heading"><div><h2>Empat langkah, makin paham.</h2><p>Ikuti berurutan, atau langsung pilih yang ingin kamu pelajari.</p></div><span class="small-label">PETA BELAJARMU ↙</span></div><div class="course-grid">${chapters.map((c,i)=>`<a class="course-card ${i===0?'featured':''}" href="#${c.id}"><div class="card-top"><span class="card-icon" aria-hidden="true">${c.icon}</span><span class="card-number">0${i+1}</span></div><h3>${c.title}</h3><p>${c.description}</p><div class="card-bottom"><span>${completed.includes(c.id)?'✓ Selesai':c.time+' · Contoh & latihan'}</span><b aria-hidden="true">↗</b></div></a>`).join('')}</div></section>
  <section class="try-block"><div class="try-copy"><div class="eyebrow">INTIP SEDIKIT</div><h2>Data rapi,<br>program lebih berarti.</h2><p>Koma, titik koma, atau tab? Kenali separator dan lihat bagaimana Python membaca setiap kolom.</p><a class="quiet-link" href="#membaca">Coba lab separator <span aria-hidden="true">↗</span></a></div><div class="try-code"><span class="comment"># siswa.csv · separator titik koma</span><br>nama;nilai<br>Ayu;90<br>Budi;85<div class="output-divider"><span class="prompt">→</span> [<span class="string">'nama'</span>, <span class="string">'nilai'</span>]<br><span class="prompt">→</span> [<span class="string">'Ayu'</span>, <span class="string">'90'</span>]<br><span class="prompt">→</span> [<span class="string">'Budi'</span>, <span class="string">'85'</span>]</div></div></section>
  <div class="beginner-note"><span aria-hidden="true">ⓘ</span><span><strong>Sudah tahu variabel, list, dan loop?</strong> Kamu siap. Siapkan Python 3 dan editor favoritmu. Semua contoh memakai pustaka bawaan.</span></div>`;
}
const readTxt = `with open("catatan.txt", "r", encoding="utf-8") as file:
    isi = file.read()

print(isi)`;
const readCsv = `import csv

with open("siswa.csv", "r", encoding="utf-8", newline="") as file:
    pembaca = csv.reader(file, delimiter=";")
    header = next(pembaca, None)  # Lewati judul kolom
    for nama, nilai in pembaca:
        print(f"{nama} mendapat nilai {nilai}")`;
const writeTxt = `with open("catatan.txt", "w", encoding="utf-8") as file:
    file.write("Belajar Python\\n")
    file.write("Sedikit setiap hari.\\n")`;
const writeCsv = `import csv

data = [["nama", "nilai"], ["Ayu", 90], ["Budi", 85]]

with open("siswa.csv", "w", encoding="utf-8", newline="") as file:
    penulis = csv.writer(file, delimiter=";")
    penulis.writerows(data)`;
const moduleData = `import csv
from pathlib import Path

FILE_DATA = Path(__file__).with_name("siswa.csv")

def baca_siswa():
    with FILE_DATA.open("r", encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file, delimiter=";"))`;
const moduleMain = `from data import baca_siswa

def main():
    for siswa in baca_siswa():
        print(f"{siswa['nama']}: {siswa['nilai']}")

if __name__ == "__main__":
    main()`;
const exceptionCode = `try:
    with open("catatan.txt", "r", encoding="utf-8") as file:
        print(file.read())
except FileNotFoundError:
    print("File belum ada. Buat catatan.txt dulu, ya.")`;
function separatorLab() {
  return `<section class="lab" id="lab"><div class="eyebrow">LAB INTERAKTIF</div><h3 style="margin-top:12px">Coba ganti separator.</h3><p>Ubah nama dan pemisah. Lihat data mentah serta kolom yang terbaca. Ini visualisasi di browser, bukan eksekusi Python.</p><div class="lab-controls"><label class="field">Nama siswa<input id="lab-name" value="Ayu" maxlength="60" autocomplete="off"></label><label class="field">Pemisah saat menulis<select id="write-separator"><option value=";">Titik koma (;)</option><option value=",">Koma (,)</option><option value="\t">Tab (\\t)</option><option value="|">Garis tegak (|)</option></select></label><label class="field">Pemisah saat membaca<select id="read-separator"><option value=";">Titik koma (;)</option><option value=",">Koma (,)</option><option value="\t">Tab (\\t)</option><option value="|">Garis tegak (|)</option></select></label></div><div class="lab-preview"><div><strong>ISI FILE siswa.csv</strong><pre id="csv-raw"></pre></div><div><strong>HASIL csv.reader</strong><pre id="csv-parsed" aria-live="polite"></pre></div></div><p id="lab-hint" aria-live="polite"></p><button class="button secondary" id="download-csv">Unduh CSV ini ↓</button></section>`;
}
function reading() {
  return `<h2 id="konsep">File itu seperti buku catatan.</h2><p>Variabel hilang saat program berhenti. File menyimpan data agar bisa dibuka lagi nanti. Untuk mulai, buat folder <code>belajar-file</code>, lalu simpan <code>baca.py</code> dan <code>catatan.txt</code> di dalamnya.</p>${codeBlock('catatan.txt','Halo, dunia Python!')}
  <h2 id="contoh">01 / Buka, baca, selesai.</h2><p>Jalankan terminal dari folder tersebut dengan <code>python baca.py</code>. Mode <code>"r"</code> berarti <em>read</em> atau membaca.</p>${codeBlock('baca.py',readTxt)}${output('Halo, dunia Python!')}
  ${callout('Kenapa memakai with?', '<code>with</code> menutup file otomatis setelah blok selesai, termasuk saat terjadi error. <code>encoding="utf-8"</code> membantu membaca karakter seperti é dengan benar.')}
  <h2>02 / Satu baris, satu data.</h2><p>Untuk membaca baris demi baris, gunakan loop. <code>strip()</code> membuang spasi dan pergantian baris di kedua ujung teks; gunakan <code>rstrip("\\n")</code> jika hanya ingin menghapus newline.</p>${codeBlock('baca_baris.py',`with open("catatan.txt", "r", encoding="utf-8") as file:
    for baris in file:
        print(baris.strip())`)}
  <h2>03 / CSV dan separator.</h2><p>CSV menyimpan data dalam baris dan kolom. <strong>Separator</strong> (delimiter) adalah karakter pemisah antarkolom. Contoh kita menggunakan titik koma:</p>${codeBlock('siswa.csv','nama;nilai\nAyu;90\nBudi;85')}${codeBlock('baca_csv.py',readCsv)}${output('Ayu mendapat nilai 90\nBudi mendapat nilai 85')}
  ${callout('Separator harus cocok.', 'File memakai <code>;</code>? Pembacanya juga perlu <code>delimiter=";"</code>. Jika memakai koma, setiap baris bisa terbaca sebagai satu kolom. Nilai dari <code>csv.reader</code> berupa teks; gunakan <code>int(nilai)</code> untuk berhitung.')}
  ${separatorLab()}${callout('Mengapa tidak cukup split(",")?', 'Data seperti <code>"Ayu, Putri",90</code> mengandung koma di dalam nama. Modul <code>csv</code> memahami tanda kutip; pemisahan dengan <code>split</code> biasa tidak. Coba nama “Ayu, Putri” dengan separator koma di lab.')}
  ${exercise('Baca daftar belanja.', 'Buat <code>belanja.txt</code> berisi tiga baris: Beras, Telur, dan Susu. Tampilkan setiap barang dengan awalan tanda hubung. Simpan kode di folder yang sama.', 'latihan_baca.py',`with open("belanja.txt", "r", encoding="utf-8") as file:
    for barang in file:
        print(f"- {barang.strip()}")`,'- Beras\n- Telur\n- Susu')}`;
}
function writing() {
  return `<h2 id="konsep">Simpan hasil programmu.</h2><p>Setelah membaca, sekarang kita menulis. Buat file <code>tulis.py</code> dan jalankan dengan <code>python tulis.py</code>. Python akan membuat file baru di folder kerja terminal jika belum ada.</p><table class="data-table"><thead><tr><th>Mode</th><th>Artinya</th><th>Jika file sudah ada</th></tr></thead><tbody><tr><td><code>"r"</code></td><td>Membaca</td><td>Isinya tetap</td></tr><tr><td><code>"w"</code></td><td>Menulis</td><td>Isi lama dihapus</td></tr><tr><td><code>"a"</code></td><td>Menambahkan</td><td>Isi baru masuk di akhir</td></tr><tr><td><code>"x"</code></td><td>Membuat file baru</td><td>Memunculkan FileExistsError</td></tr></tbody></table>
  <h2 id="contoh">01 / Menulis teks.</h2>${codeBlock('tulis.py',writeTxt)}${output('Isi catatan.txt:\nBelajar Python\nSedikit setiap hari.')}
  ${callout('Perhatikan mode "w".', 'Membuka file dengan <code>"w"</code> langsung mengosongkan isinya. Pakai file latihan agar catatan pentingmu aman. <code>\\n</code> berarti pindah ke baris baru.',true)}
  <h2>02 / Menambah tanpa menghapus.</h2><p>Dengan mode <code>"a"</code> (<em>append</em>), tulisan baru ditambahkan di akhir. Jika kamu menjalankannya dua kali, baris baru juga akan ditambahkan dua kali.</p>${codeBlock('tambah.py',`with open("catatan.txt", "a", encoding="utf-8") as file:
    file.write("Besok belajar modul.\\n")`)}
  <h2>03 / Menulis data yang rapi.</h2><p>Pakai <code>csv.writer</code> untuk mengurus separator dan tanda kutip. <code>writerows()</code> menulis banyak baris; <code>writerow()</code> menulis satu baris.</p>${codeBlock('tulis_csv.py',writeCsv)}${codeBlock('siswa.csv — hasil file','nama;nilai\nAyu;90\nBudi;85')}
  ${callout('Jangan lewatkan newline="".', 'Saat membuka CSV, gunakan <code>newline=""</code> agar modul <code>csv</code> mengatur pergantian baris sendiri. Ini juga mencegah baris kosong tambahan di Windows.')}
  ${separatorLab()}
  ${exercise('Simpan daftar harga.', 'Buat <code>harga.csv</code> memakai separator koma, dengan judul kolom <code>barang,harga</code>. Tambahkan Buku seharga 12000 dan Pensil seharga 3000.', 'latihan_tulis.py',`import csv

with open("harga.csv", "w", encoding="utf-8", newline="") as file:
    penulis = csv.writer(file, delimiter=",")
    penulis.writerow(["barang", "harga"])
    penulis.writerow(["Buku", 12000])
    penulis.writerow(["Pensil", 3000])`,'Isi harga.csv:\nbarang,harga\nBuku,12000\nPensil,3000')}`;
}
function modules() {
  return `<h2 id="konsep">Satu program, beberapa file.</h2><p>Modul adalah file Python yang bisa dipakai dari file Python lain. Misalnya, logika membaca data disimpan di <code>data.py</code>, sementara alur program ada di <code>main.py</code>. Hubungkan keduanya dengan <code>import</code>.</p><div class="module-files"><div class="module-file">proyek-siswa/<br>├── main.py<br>├── data.py<br>└── siswa.csv</div><span aria-hidden="true">→</span><p>Simpan ketiga file<br>di folder yang sama.</p></div>
  <h2 id="contoh">01 / Pisahkan tugasnya.</h2><p>Klik nama file di bawah. Salin setiap contoh ke file yang sesuai. Mulai dengan data, lalu buat modul pembaca, dan terakhir program utama.</p><div class="tabs" role="tablist" aria-label="Contoh proyek modul"><button class="tab active" role="tab" aria-selected="true" aria-controls="module-panel" id="tab-data" data-module="data.py">data.py</button><button class="tab" role="tab" aria-selected="false" aria-controls="module-panel" id="tab-main" tabindex="-1" data-module="main.py">main.py</button><button class="tab" role="tab" aria-selected="false" aria-controls="module-panel" id="tab-csv" tabindex="-1" data-module="siswa.csv">siswa.csv</button></div><div id="module-panel" role="tabpanel" aria-labelledby="tab-data">${codeBlock('data.py',moduleData)}</div>
  <p><code>csv.DictReader</code> memakai baris pertama sebagai nama kolom, sehingga kita bisa mengakses <code>siswa["nama"]</code>. <code>Path(__file__)</code> membantu mencari CSV di sebelah <code>data.py</code>, meskipun folder kerja terminal berbeda.</p>
  <h2>02 / Jalankan file utama.</h2>${codeBlock('terminal','cd proyek-siswa\npython main.py')}${output('Ayu: 90\nBudi: 85')}
  <h3>Apa arti import?</h3>${codeBlock('dua cara mengimpor',`# Cara 1: impor satu fungsi
from data import baca_siswa
daftar = baca_siswa()

# Cara 2: impor modulnya
import data
daftar = data.baca_siswa()`)}
  ${callout('Kenapa ada if __name__ == "__main__"?', 'Blok ini hanya berjalan ketika <code>main.py</code> dijalankan langsung. Saat file diimpor sebagai modul, fungsi <code>main()</code> tidak otomatis dipanggil.')}
  ${callout('Pilih nama file dengan hati-hati.', 'Jangan beri nama file sendiri <code>csv.py</code> atau <code>random.py</code>. Nama tersebut bisa menutupi modul bawaan Python. Nama file seperti <code>data_siswa.py</code> lebih jelas.')}
  ${exercise('Bikin modul penghitung nilai.', 'Buat <code>hitung.py</code> yang punya fungsi <code>rata_rata(nilai)</code>. Impor fungsi itu di <code>main.py</code> dan hitung rata-rata dari <code>[80, 90, 100]</code>.', 'hitung.py',`def rata_rata(nilai):
    if not nilai:
        return 0
    return sum(nilai) / len(nilai)`)}
  <p>Setelah mencoba sendiri, ini pemanggilnya:</p>${codeBlock('main.py',`from hitung import rata_rata

if __name__ == "__main__":
    hasil = rata_rata([80, 90, 100])
    print(f"Rata-rata: {hasil}")`)}${output('Rata-rata: 90.0')}`;
}
function exceptions() {
  return `<h2 id="konsep">Error bisa ditangani.</h2><p>Nama file salah? Angka ternyata berisi teks? Python memunculkan <strong>exception</strong> saat program tidak bisa melanjutkan operasi. Dengan <code>try</code> dan <code>except</code>, kita bisa menangani masalah yang sudah diperkirakan.</p>
  <h2 id="contoh">01 / Jika file tidak ditemukan.</h2><p>Letakkan operasi yang berpotensi gagal di dalam <code>try</code>. Tangani jenis error yang sesuai di <code>except</code>.</p>${codeBlock('baca_aman.py',exceptionCode)}${output('Jika catatan.txt tidak ada:\nFile belum ada. Buat catatan.txt dulu, ya.')}
  <table class="data-table"><thead><tr><th>Exception</th><th>Kapan terjadi?</th></tr></thead><tbody><tr><td><code>FileNotFoundError</code></td><td>File yang dibaca tidak ada.</td></tr><tr><td><code>PermissionError</code></td><td>Tidak memiliki izin mengakses file.</td></tr><tr><td><code>ValueError</code></td><td>Nilai tidak cocok, misalnya int("halo").</td></tr><tr><td><code>ZeroDivisionError</code></td><td>Pembagian dengan nol.</td></tr></tbody></table>
  <h2>02 / Masukan pengguna belum tentu angka.</h2>${codeBlock('nilai_aman.py',`try:
    nilai = int(input("Masukkan nilai 0–100: "))
    if not 0 <= nilai <= 100:
        raise ValueError("Nilai harus berada di antara 0 dan 100.")
except ValueError:
    print("Masukkan bilangan bulat dari 0 sampai 100, ya.")
else:
    print(f"Nilai tersimpan: {nilai}")`)}
  <p><code>else</code> berjalan hanya jika blok <code>try</code> berhasil. <code>finally</code>, jika dipakai, selalu berjalan setelahnya, cocok untuk langkah penutup. Untuk menutup file, <code>with</code> sudah mengurusnya.</p>
  ${callout('Tangkap error yang kamu pahami.', 'Pilih <code>except ValueError</code> atau <code>except FileNotFoundError</code> sesuai kebutuhan. Hindari <code>except:</code> lalu <code>pass</code>, karena kesalahan bisa tersembunyi tanpa penjelasan.')}
  <h2>03 / Gabungkan dengan modul.</h2><p>Gunakan <code>data.py</code> dari bab sebelumnya, kemudian perbarui <code>main.py</code>. Contoh ini membaca file, menghitung rata-rata, dan menangani nilai yang tidak valid.</p>${codeBlock('main.py',`from data import baca_siswa

def main():
    try:
        siswa = baca_siswa()
        nilai = [int(baris["nilai"]) for baris in siswa]
    except FileNotFoundError:
        print("siswa.csv belum ditemukan.")
    except (ValueError, KeyError):
        print("Periksa kolom nama dan nilai. Nilai harus angka.")
    else:
        if nilai:
            print(f"Rata-rata kelas: {sum(nilai) / len(nilai)}")
        else:
            print("Belum ada data siswa.")

if __name__ == "__main__":
    main()`)}${output('Rata-rata kelas: 87.5')}
  ${exercise('Bagi dengan aman.', 'Minta pengguna memasukkan pembagi untuk angka 100. Tangani masukan yang bukan angka dan pembagian dengan nol. Coba masukan <code>5</code>, <code>0</code>, dan <code>halo</code>.', 'latihan_exception.py',`try:
    pembagi = float(input("100 dibagi berapa? "))
    hasil = 100 / pembagi
except ValueError:
    print("Masukkan angka, ya.")
except ZeroDivisionError:
    print("Tidak bisa membagi dengan nol.")
else:
    print(f"Hasil: {hasil}")`,'Masukan 5 → Hasil: 20.0\nMasukan 0 → Tidak bisa membagi dengan nol.\nMasukan halo → Masukkan angka, ya.')}`;
}
function lesson(id) {
  const i = chapters.findIndex(c=>c.id===id); const c=chapters[i];
  return `<header class="lesson-head"><div class="eyebrow">BAB 0${i+1} / 04</div><h1>${c.title}${id==='exception'?'. Biar tetap jalan.':'. Pelan-pelan.'}</h1><p>${c.description} Ikuti contohnya, lalu coba latihan kecil di akhir bab.</p><div class="lesson-meta"><span>${c.time}</span><span>Python 3</span><span>Teori + praktik</span></div></header><div class="lesson-layout"><article class="lesson-body">${{membaca:reading,menulis:writing,modul:modules,exception:exceptions}[id]()}<div class="lesson-finish"><span>Sudah mencoba dan mengerti? Tandai bab ini.</span><button class="button" data-complete="${id}">${completed.includes(id)?'Selesai, lanjutkan':'Tandai selesai & lanjut'} <span aria-hidden="true">→</span></button></div></article><aside class="lesson-aside"><div class="lesson-aside-inner"><h3>DALAM BAB INI</h3><a href="#konsep" data-scroll="konsep">01 &nbsp; Pahami konsepnya</a><a href="#contoh" data-scroll="contoh">02 &nbsp; Coba contoh kodenya</a>${['membaca','menulis'].includes(id)?'<a href="#lab" data-scroll="lab">03 &nbsp; Main di lab separator</a>':''}<a href="#latihan" data-scroll="latihan">↗ &nbsp; Giliran kamu</a><hr><p>Belajar lebih enak sambil mencoba. Semua file contoh sudah disiapkan.</p><a class="button secondary" href="./contoh-python.zip" download>Unduh contoh ↓</a></div></aside></div>`;
}
const questions = [
  {q:'Mau menambah catatan tanpa menghapus isi lama. Mode mana yang dipakai?',options:['"r" — read','"w" — write','"a" — append'],answer:2,why:'Mode "a" menambah di akhir file. Mode "w" menghapus isi lama saat file dibuka.'},
  {q:'File berisi Ayu;90. Apa delimiter yang sesuai?',options:['delimiter=","','delimiter=";"','delimiter="|"'],answer:1,why:'Pemisah di file adalah titik koma, jadi delimiter pembaca harus ";".'},
  {q:'Fungsi sapa() ada di pesan.py. Bagaimana cara mengimpornya?',options:['from pesan import sapa','import sapa from pesan','open("pesan.py")'],answer:0,why:'Gunakan from nama_modul import nama_fungsi. Tidak perlu menulis ekstensi .py.'},
  {q:'int("halo") memunculkan error apa?',options:['FileNotFoundError','ValueError','ZeroDivisionError'],answer:1,why:'"halo" tidak bisa diubah menjadi bilangan bulat, sehingga Python memunculkan ValueError.'},
  {q:'Mengapa kita memakai with open(...) as file?',options:['Agar file selalu bisa ditemukan','Agar file otomatis ditutup setelah blok selesai','Agar isi file otomatis menjadi angka'],answer:1,why:'with mengurus penutupan file secara otomatis, bahkan ketika terjadi exception.'}
];
function quiz() {
  return `<header class="lesson-head"><div class="eyebrow">WAKTUNYA CEK PEMAHAMAN</div><h1>Sudah nyambung?</h1><p>Lima pertanyaan kecil untuk mengikat yang sudah kamu pelajari. Salah itu bagian dari belajar; pembahasannya langsung tersedia.</p></header><form id="quiz-form" class="quiz-area">${questions.map((q,i)=>`<fieldset class="quiz-card"><legend>${i+1}. ${q.q}</legend>${q.options.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}" required><span>${esc(o)}</span></label>`).join('')}<div id="feedback-${i}" class="quiz-feedback" aria-live="polite"></div></fieldset>`).join('')}<div class="quiz-actions"><button class="button" type="submit">Periksa jawaban →</button><button class="button secondary" type="reset">Coba lagi ↻</button></div><div id="quiz-result" role="status"></div></form><section class="exercise quiz-area"><div class="eyebrow">TANTANGAN AKHIR</div><h2>Catatan nilai kelas.</h2><p>Gabungkan semuanya: buat <code>data.py</code> untuk membaca <code>siswa.csv</code> dengan separator titik koma. Impor ke <code>main.py</code>, hitung rata-rata, lalu tangani file yang hilang dan nilai yang bukan angka.</p><p>Petunjuk: mulai dari proyek modul, lalu tambahkan <code>try/except</code> dari bab terakhir. Uji dengan mengganti nama CSV dan mengubah satu nilai menjadi teks.</p><a class="button secondary" href="#exception">Lihat contoh gabungan →</a></section>`;
}
function showToast(message) {const t=document.querySelector('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('visible'),2500);}
function parseCsv(text, delimiter) {
  const rows=[];let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++) { const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else if(quoted||field===''){quoted=!quoted;}else field+=c;}else if(c===delimiter&&!quoted){row.push(field);field='';}else if(c==='\n'&&!quoted){row.push(field);rows.push(row);row=[];field='';}else field+=c; }
  row.push(field);rows.push(row);return rows;
}
function labData() {
  const name = document.querySelector('#lab-name').value || 'Ayu';
  const sep = document.querySelector('#write-separator').value;
  const readSep = document.querySelector('#read-separator').value;
  const quote = s => {s=String(s);return s.includes(sep)||/["\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
  const raw = [['nama','nilai'],[name,'90'],['Budi','85']].map(row=>row.map(quote).join(sep)).join('\n');
  return {raw,sep,readSep};
}
function updateLab() {
  const {raw,sep,readSep}=labData();
  document.querySelector('#csv-raw').textContent=raw.replace(/\t/g,'⇥');
  document.querySelector('#csv-parsed').textContent=parseCsv(raw,readSep).map(row=>JSON.stringify(row)).join('\n');
  document.querySelector('#lab-hint').textContent=sep===readSep?'✓ Separator cocok. Setiap baris terbaca menjadi dua kolom. Tab ditampilkan sebagai ⇥.':'↳ Separator berbeda. Perhatikan jumlah kolomnya! Samakan pemisah pembaca dengan isi file. Tab ditampilkan sebagai ⇥.';
}
function setupQuiz() {
  const form=document.querySelector('#quiz-form');if(!form)return;
  form.addEventListener('submit',e=> {e.preventDefault();let score=0;questions.forEach((q,i)=>{const good=Number(new FormData(form).get(`q${i}`))===q.answer;if(good)score++;const f=document.querySelector(`#feedback-${i}`);f.textContent=`${good?'✓ Benar.':'↳ Belum tepat.'} ${q.why}`;f.className=`quiz-feedback ${good?'':'incorrect'}`;});const result=document.querySelector('#quiz-result');result.className='quiz-result';result.textContent=`${score} dari ${questions.length} jawaban benar. ${score===5?'Keren, konsep dasarnya sudah kamu pahami!':'Baca pembahasannya, lalu coba lagi. Kamu bisa kembali ke bab mana pun.'}`;result.scrollIntoView({behavior:'smooth',block:'center'});});
  form.addEventListener('reset',()=>{document.querySelectorAll('.quiz-feedback').forEach(f=>f.textContent='');const result=document.querySelector('#quiz-result');result.textContent='';result.className='';});
}
function render() {
  const hash=location.hash.slice(1)||'beranda';
  if(hash==='materi'&&document.querySelector('#materi')) {document.querySelector('#materi').scrollIntoView();return;}
  const id=hash==='materi'?'beranda':([...chapters.map(c=>c.id),'kuis','beranda'].includes(hash)?hash:'beranda');
  codeStore.clear();codeIndex=0;renderNavigation(id);
  main.innerHTML=id==='beranda'?home():id==='kuis'?quiz():lesson(id);
  document.querySelector('#breadcrumb').textContent=id==='beranda'?'File & Exceptions':id==='kuis'?'Cek pemahaman':chapters.find(c=>c.id===id).title;
  document.title=`${id==='beranda'?'File & Exceptions':id==='kuis'?'Cek pemahaman':chapters.find(c=>c.id===id).title} — Python Pelan-Pelan`;
  document.querySelector('#sidebar').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');
  if(document.querySelector('#lab')){document.querySelectorAll('#lab input, #lab select').forEach(el=>el.addEventListener('input',updateLab));updateLab();}
  setupQuiz();window.scrollTo({top:0,behavior:'instant'});
  if(hash==='materi')document.querySelector('#materi').scrollIntoView();
}
document.addEventListener('click',async e=> {
  const copy=e.target.closest('[data-copy]');if(copy){try{await navigator.clipboard.writeText(codeStore.get(copy.dataset.copy));showToast('Kode disalin. Siap dicoba di Python!');}catch{showToast('Salin secara manual dari kotak kode.');}return;}
  const scroller=e.target.closest('[data-scroll]');if(scroller){e.preventDefault();document.getElementById(scroller.dataset.scroll)?.scrollIntoView({behavior:'smooth'});return;}
  const done=e.target.closest('[data-complete]');if(done){const id=done.dataset.complete;if(!completed.includes(id))completed.push(id);try{localStorage.setItem('python-pelan-progress',JSON.stringify(completed));}catch{}const i=chapters.findIndex(c=>c.id===id);location.hash=chapters[i+1]?.id||'kuis';showToast('Satu langkah lagi selesai. Lanjut!');return;}
  const tab=e.target.closest('[data-module]');if(tab){document.querySelectorAll('[data-module]').forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});document.querySelector('#module-panel').setAttribute('aria-labelledby',tab.id);document.querySelector('#module-panel').innerHTML=codeBlock(tab.dataset.module,{'data.py':moduleData,'main.py':moduleMain,'siswa.csv':'nama;nilai\nAyu;90\nBudi;85'}[tab.dataset.module]);return;}
  if(e.target.closest('#download-csv')){const {raw}=labData();const blob=new Blob([raw.replace(/\n/g,'\r\n')+'\r\n'],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='siswa.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('CSV diunduh. Coba baca dengan Python.');}
  if(document.querySelector('#sidebar.open')&&!e.target.closest('.sidebar')&&!e.target.closest('#menu')){document.querySelector('#sidebar').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('#sidebar').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');}if(e.target.matches('[data-module]')&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const tabs=[...document.querySelectorAll('[data-module]')];const i=tabs.indexOf(e.target);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;tabs[next].click();tabs[next].focus();}});
document.querySelector('#menu').addEventListener('click',()=>{const open=document.querySelector('#sidebar').classList.toggle('open');document.querySelector('#menu').setAttribute('aria-expanded',String(open));});
window.addEventListener('hashchange',render);
render();
