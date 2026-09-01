---
title: "Panduan Praktis Resistor"
description: "Materi Resistor untuk Keterampilan TJKT MAN 2 Cianjur MAN Plus Keterampilan"
pubDate: 2026-09-01
category: "Kelistrikan"
tags: ["listrik", "komponen"]
duration: 3
---

TJKT & Dasardasar Elektronika • 8 min read

# Konsep Dasar Resistansi & Resistor: Fondasi Hardware PC dan Robotika

Panduan ringkas dan komprehensif memahami peran resistor, rumus hambatan material, anatomi dalam, hingga cara membaca kode gelang warna dan toleransi.

## ⚡ 1. Pengertian & Fungsi Utama Resistor

**Resistor** adalah komponen elektronika pasif yang berfungsi untuk menahan, membatasi, dan memanipulasi arus listrik yang mengalir dalam suatu rangkaian. Resistor dipasang secara seri pada jalur utama untuk melindungi komponen sensitif dari arus berlebih.

💡 Mengapa Komponen Membutuhkan Resistor?

Setiap komponen seperti LED atau pin GPIO mikrokontroler memiliki batas arus maksimum (contoh: LED kuning maksimal 0,03 A). Jika dihubungkan langsung ke baterai 9V tanpa pembatas, arus yang mengalir bisa mencapai 9 A yang secara instan akan memutus atau membakar komponen tersebut.

Perhitungan Kebutuhan Resistor (Hukum Ohm)

R = V / I

Untuk Baterai **V = 9V** dan arus LED maksimal **I = 0,03 A**:  
R = 9 / 0,03 = 300 Ω (Membutuhkan total resistansi minimal **300 Ohm**).

## 🛣️ 2. Analogi Jalan Raya & Faktor Hambatan Material

Nilai resistansi suatu benda dipengaruhi oleh jenis bahan dan ukuran fisiknya secara matematis:

R = ρ × ( L / A )

1\. Luas Penampang (A)

Diibaratkan **Lebar Jalan**. Semakin lebar jalan (A besar), semakin banyak arus/kendaraan yang bisa lewat sehingga resistansi kecil.

2\. Resistivitas (ρ)

Diibaratkan **Kondisi Jalan**. Jalan mulus = resistivitas rendah. Jalan berlubang = resistivitas tinggi (arus sulit lewat).

3\. Panjang Material (L)

Diibaratkan **Panjang Jalan**. Semakin panjang jalan, semakin banyak rintangan sehingga nilai resistansinya semakin besar.

## 🔍 3. Anatomi Dalam Resistor Film Karbon

**Coating / Casing Luar:** Lapisan isolator pelindung fisik berwarna krim.

**Batang Keramik Inti:** Struktur dalam non-konduktif sebagai penopang utama.

**Lapisan Karbon Konduktif:** Bahan penghambat utama arus listrik (ρ ≈ 0,1 Ω·m).

**Helical Cut (Motif Ulir Spiral):** Karbon dikikis berbentuk ulir dengan mesin presisi untuk menyesuaikan panjang dan luas penampang agar menghasilkan nilai Ohm yang tepat.

## 🎨 4. Pembacaan Kode Warna Gelang & Toleransi

Gelang warna dicetak melingkari permukaan resistor agar nilainya tetap dapat dibaca dengan mudah dari segala sudut pemasangan.

Warna

Angka Signifikan

Pengganda (Multiplier)

Toleransi

Hitam

0

10⁰ (1)

\-

Cokelat

1

10¹ (10)

± 1%

Merah

2

10² (100)

± 2%

Oranye

3

10³ (1.000)

\-

Kuning

4

10⁴ (10.000)

\-

Hijau

5

10⁵ (100.000)

± 0.5%

Emas

\-

0.1

± 5%

📌 Contoh Soal: Cokelat - Merah - Merah - Emas

*   Gelang 1 & 2 = 1 dan 2 (12)
*   Gelang 3 (Pengganda) = 100
*   Gelang 4 (Toleransi) = ± 5%
*   **Nilai Teoretis:** 12 × 100 = **1.200 Ω (1,2 kΩ)**
*   **Rentang Ukur Wajar:** 1.140 Ω s/d 1.260 Ω.

## ✏️ 5. Latihan Jawaban Singkat

Cokelat - Hitam - Merah - Emas

1.000 Ω (1 kΩ)

Kuning - Ungu - Oranye - Emas

47.000 Ω (47 kΩ)

Merah - Merah - Cokelat - Emas

220 Ω
