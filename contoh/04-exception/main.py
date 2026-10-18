from data import baca_siswa

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
    main()
