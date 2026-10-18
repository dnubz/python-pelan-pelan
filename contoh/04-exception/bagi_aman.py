try:
    pembagi = float(input("100 dibagi berapa? "))
    hasil = 100 / pembagi
except ValueError:
    print("Masukkan angka, ya.")
except ZeroDivisionError:
    print("Tidak bisa membagi dengan nol.")
else:
    print(f"Hasil: {hasil}")
