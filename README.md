# Python Pelan-Pelan

Situs belajar Python berbahasa Indonesia untuk pemula: membaca dan menulis TXT/CSV, separator data, program dengan beberapa modul, serta penanganan exception.

**Website:** https://dnubz.github.io/python-pelan-pelan/

## Menjalankan situs secara lokal

Tidak perlu npm atau proses build. Dengan Python 3:

```sh
python -m http.server 8080 --directory dist
```

Buka http://localhost:8080. Semua konten dan interaksi situs memakai HTML, CSS, dan JavaScript. Google Fonts bersifat opsional; font sistem menjadi cadangan saat offline. Lab CSV adalah visualisasi JavaScript, bukan interpreter Python. Progres bab disimpan di localStorage browser pengguna.

## Contoh Python

Unduh `dist/contoh-python.zip` dari situs atau gunakan folder `contoh/`. Semua contoh hanya membutuhkan pustaka standar Python 3. Jalankan dari folder contoh terkait. Mode `w` menimpa file latihan yang sudah ada.

## Publikasi

GitHub Pages disetel memakai branch `codex/python-pelan-pelan` dan folder `/docs`. Isi `docs/` merupakan salinan siap tayang dari `dist/`. Setelah mengubah situs, salin kembali isi `dist/` ke `docs/`, commit, lalu push ke branch tersebut. File `.nojekyll` menjaga situs dilayani sebagai berkas statis.

## Referensi

- [Tutorial Python: Input dan Output](https://docs.python.org/id/3/tutorial/inputoutput.html#reading-and-writing-files)
- [Modul](https://docs.python.org/id/3/tutorial/modules.html)
- [Error dan exception](https://docs.python.org/id/3/tutorial/errors.html)
- [Modul csv](https://docs.python.org/3/library/csv.html)

Tidak menggunakan analitik, akun pengguna, atau dependensi JavaScript eksternal.
