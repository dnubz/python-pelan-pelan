import csv
from pathlib import Path

FILE_DATA = Path(__file__).with_name("siswa.csv")

def baca_siswa():
    with FILE_DATA.open("r", encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file, delimiter=";"))
