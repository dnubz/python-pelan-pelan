import csv

data = [["nama", "nilai"], ["Ayu", 90], ["Budi", 85]]

with open("siswa.csv", "w", encoding="utf-8", newline="") as file:
    penulis = csv.writer(file, delimiter=";")
    penulis.writerows(data)
