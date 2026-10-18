try:
    with open("catatan.txt", "r", encoding="utf-8") as file:
        print(file.read())
except FileNotFoundError:
    print("File belum ada. Buat catatan.txt dulu, ya.")
