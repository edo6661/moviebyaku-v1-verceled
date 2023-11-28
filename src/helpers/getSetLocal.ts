// Fungsi untuk mendapatkan item dari localStorage
export function getItemFromLocalStorage(key: string) {
	try {
		// Dapatkan item dari localStorage
		const item = window.localStorage.getItem(key);
		// Parse item yang disimpan atau kembalikan null jika tidak ada
		return item ? JSON.parse(item) : null;
	} catch (error) {
		// Jika terjadi kesalahan, cetak ke konsol dan kembalikan null
		console.error(error);
		return null;
	}
}

// Fungsi untuk mengatur item di localStorage
export function setItemInLocalStorage(key: string, value: string) {
	try {
		// Ubah nilai menjadi string JSON dan simpan di localStorage
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		// Jika terjadi kesalahan, cetak ke konsol
		console.error(error);
	}
}
