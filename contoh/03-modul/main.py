from data import baca_siswa

def main():
    for siswa in baca_siswa():
        print(f"{siswa['nama']}: {siswa['nilai']}")

if __name__ == "__main__":
    main()
