import csv

with open("siswa.csv", "r", encoding="utf-8", newline="") as file:
    pembaca = csv.reader(file, delimiter=";")
    header = next(pembaca, None)  # Lewati judul kolom
    for nama, nilai in pembaca:
        print(f"{nama} mendapat nilai {nilai}")
