---
title: "Panduan Praktikum: Rangkaian Listrik Dasar & Robotika Cerdas di Tinkercad"
description: "Modul praktikum Dasar-Dasar TJKT kelas X: Eksplorasi resistor pembatas arus, efek fading kapasitor, kendali RPM motor DC, hingga integrasi robot otonom berbasis Arduino Uno."
pubDate: 2026-09-08
tags: ["elektronika", "tinkercad", "arduino", "robotika", "tutorial", "sirkuit", "tjkt"]
duration: 9
---

{/* Header Modul Praktikum */}
<div class="article-card" style="background: linear-gradient(135deg, rgba(30, 60, 114, 0.15) 0%, rgba(42, 82, 152, 0.15) 100%); border-left: 4px solid var(--accent-orange); margin-bottom: 28px;">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
    <span class="card-tag tag-tkj">MODUL AJAR PRAKTIKUM</span>
    <span class="card-tag tag-garden">FASE E &bull; KELAS X TJKT</span>
    <span class="card-tag tag-garden">4 JP (4 &times; 45 MENIT)</span>
  </div>
  <h2 style="margin: 0 0 10px 0; border-bottom: none; padding-bottom: 0;">Praktek Rangkaian Listrik Dasar &amp; Simulasi Robotika Tinkercad</h2>
  <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">
    Mata Pelajaran: <strong>Dasar-Dasar Teknik Jaringan Komputer dan Telekomunikasi (TJKT)</strong> &bull; MAN 2 Cianjur
  </p>
</div>

{/* Informasi Tabel Modul Ringkas */}
<div class="table-responsive" style="margin: 20px 0 32px 0;">
  <table>
    <tbody>
      <tr>
        <td style="width: 25%; font-weight: 700; background: var(--bg-alt);">Fase / Kelas</td>
        <td>Fase E / Kelas X (Sepuluh) &ndash; Konsentrasi Keahlian TJKT</td>
      </tr>
      <tr>
        <td style="font-weight: 700; background: var(--bg-alt);">Alokasi Waktu</td>
        <td>4 Jam Pelajaran (4 &times; 45 Menit / 1 Kali Pertemuan Tatap Muka)</td>
      </tr>
      <tr>
        <td style="font-weight: 700; background: var(--bg-alt);">Penyusun</td>
        <td>Tim Guru Produktif TJKT MAN 2 Cianjur</td>
      </tr>
      <tr>
        <td style="font-weight: 700; background: var(--bg-alt);">Platform Pendukung</td>
        <td>Autodesk Tinkercad Circuits &bull; EduQuest LMS &bull; Laboratorium Komputer Hardware</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 🌊 1. Pendahuluan & Analogi Dunia Nyata

### Mengapa Harus Belajar Elektronika di Simulator Tinkercad?

Bayangkan Anda adalah seorang calon teknisi jaringan dan robotika yang sedang merancang sirkuit kelistrikan perangkat server. Apakah Anda akan langsung menyambungkan komponen berharga mahal langsung ke sumber tegangan tinggi tanpa simulasi? Tentu tidak. Kesalahan satu kutub atau ketiadaan resistor dapat membakar sirkuit dalam sekejap mata.

Simulator **Autodesk Tinkercad Circuits** menjadi laboratorium virtual yang aman: Anda dapat menguji batas ekstrim komponen, memahami aliran muatan, dan melihat ikon ledakan simulasi (*burnout*) tanpa risiko merusak komponen fisik atau bahaya sengatan listrik.

Untuk mempermudah pemahaman aliran elektron, mari kita gunakan **Analogi Aliran Air Sungai &amp; Bendungan**:

<div class="feature-grid-3">
  <div class="feature-card">
    <div class="feature-icon-badge">🔋</div>
    <h4 style="margin-bottom: 8px;">Baterai (Tegangan / V)</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      <strong>Pompa Air Utama:</strong> Memberikan perbedaan tekanan potensial agar elektron terdorong mengalir melalui pipa kawat sirkuit.
    </p>
  </div>

  <div class="feature-card">
    <div class="feature-icon-badge">🚧</div>
    <h4 style="margin-bottom: 8px;">Resistor (Hambatan / R)</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      <strong>Penyempitan Pipa:</strong> Menahan debit arus air yang lewat agar turbin hilir (komponen sensitif) tidak jebol akibat arus liar.
    </p>
  </div>

  <div class="feature-card">
    <div class="feature-icon-badge">🌊</div>
    <h4 style="margin-bottom: 8px;">Kapasitor (Tandon / C)</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      <strong>Waduk Penampung:</strong> Menyimpan kelebihan muatan air sementara waktu dan melepaskannya kembali saat pompa utama dimatikan.
    </p>
  </div>
</div>

<div class="callout callout-info">
  <p>
    <strong>Tujuan Utama Praktikum:</strong> Membangun intuisi teknik kelistrikan secara bertahap dalam 4 level: mulai dari proteksi komponen (Praktik 1), kontrol transien muatan (Praktik 2), dinamika aktuator mekanik (Praktik 3), hingga otomasi robot cerdas berbasis mikrokontroler (Praktik 4).
  </p>
</div>

---

## 🔬 2. Dasar Teori & Formula Perhitungan Sirkuit

Sebelum membuka lembar kerja Tinkercad, pahami prinsip dasar matematis berikut:

### A. Bahaya Arus Berlebih & Perhitungan Resistor Pembatas
Lampu LED (*Light Emitting Diode*) memiliki tegangan kerja maju (*Forward Voltage / V<sub>LED</sub>*) sebesar **1,8V s.d. 2,2V** dengan arus aman maksimal **0,02 A (20 mA)**. Jika dihubungkan langsung ke baterai 9V tanpa resistor, arus yang mengalir melonjak hingga ratusan kali lipat yang menyebabkan *thermal runaway* (ledakan kristal semikonduktor).

<div class="formula-card">
  <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">
    Rumus Menghitung Resistor Pembatas LED
  </div>
  <div class="formula-math" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
    <span>R =</span>
    <span style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; font-size: 0.85em;">
      <span style="border-bottom: 2px solid var(--accent-orange); padding: 0 10px 4px 10px;">V<sub>sumber</sub> &minus; V<sub>LED</sub></span>
      <span style="padding-top: 4px;">I<sub>LED</sub></span>
    </span>
  </div>
  <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 8px; margin-bottom: 0;">
    Untuk baterai 9V dan LED merah (2V, 20 mA): <strong>R = (9V &minus; 2V) / 0,02A = 350 &Omega;</strong> (digunakan nilai standar lab <strong>220 &Omega; &ndash; 330 &Omega;</strong>).
  </p>
</div>

### B. Karakteristik Transien Kapasitor (Charging & Discharging)
Kapasitor elektrolit menyimpan muatan elektrostatik dengan konstanta waktu peluruhan:
$$\tau = R \times C$$
Di mana semakin besar nilai kapasitas ($C$ dalam mikrofarad) dan nilai resistor ($R$), maka durasi pemudaran cahaya (*fade-out delay*) akan berlangsung semakin lama.

### C. Hubungan Tegangan Terhadap RPM Motor Listrik
Kecepatan putar motor DC berbanding lurus terhadap tegangan efektif yang diterimanya. Pada rangkaian analog, hambatan potensiometer membagi tegangan. Pada era digital modern, mikrokontroler menggunakan sinyal **PWM (Pulse Width Modulation)** untuk memvariasikan siklus kerja (*duty cycle*) tanpa membuang energi menjadi panas berlebih.

---

## 🧰 3. Peralatan Praktikum (Virtual Equipment List)

Buka proyek baru pada menu **Tinkercad &rarr; Circuits &rarr; Create New Circuit**, lalu siapkan komponen virtual berikut dari panel sebelah kanan:

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th style="width: 8%; text-align: center;">No</th>
        <th style="width: 25%;">Alat &amp; Komponen</th>
        <th style="width: 32%;">Spesifikasi / Nilai</th>
        <th>Fungsi Praktikum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center; font-weight: 700;">1</td>
        <td><strong>Baterai 9V</strong></td>
        <td>9 Volt DC Alkaline Battery</td>
        <td>Sumber catu daya utama rangkaian mandiri</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">2</td>
        <td><strong>Resistor Keramik</strong></td>
        <td>220 &Omega; (Merah-Merah-Cokelat) &amp; 1 k&Omega;</td>
        <td>Pembatas arus LED &amp; penentu waktu pelepasan muatan</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">3</td>
        <td><strong>LED (Light Emitting Diode)</strong></td>
        <td>LED 5mm (Warna Merah &amp; Hijau)</td>
        <td>Indikator beban visual output status</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">4</td>
        <td><strong>Kapasitor Elektrolit</strong></td>
        <td>100 &mu;F dan 1.000 &mu;F / 16V Polar</td>
        <td>Penyimpan muatan peredam lonjakan arus (efek fading)</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">5</td>
        <td><strong>Potensiometer Rotary</strong></td>
        <td>10 k&Omega; Linear Tiga Kaki</td>
        <td>Pembagi tegangan manual pengatur kecepatan motor</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">6</td>
        <td><strong>Motor DC Hobby</strong></td>
        <td>Hobby Gearmotor DC 3V&ndash;9V</td>
        <td>Aktuator gerak mekanik roda robot</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">7</td>
        <td><strong>Arduino Uno R3</strong></td>
        <td>Mikrokontroler ATmega328P</td>
        <td>Pusat pemroses komputasi logika robot otomatis</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">8</td>
        <td><strong>Sensor Ultrasonik (HC-SR04)</strong></td>
        <td>Sensor Jarak 4-Pin (VCC, Trig, Echo, GND)</td>
        <td>Mata sonar pendeteksi rintangan halangan di depan robot</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: 700;">9</td>
        <td><strong>Piezo Buzzer</strong></td>
        <td>Buzzer Pasif 5V</td>
        <td>Indikator audio peringatan tanda bahaya / sirine</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 📝 4. Langkah Praktikum Bertahap (Step-by-Step)

Praktikum ini dibagi ke dalam 4 modul berurutan:

### Fase 1: Praktik 1 &ndash; Rangkaian Sederhana LED (Proteksi Resistor)
1. Tarik **Baterai 9V**, **Pushbutton**, **Resistor 220 &Omega;**, dan **LED** ke atas bidang kerja.
2. Sambungkan kabel dari **Kutub Positif (+) Baterai** ke salah satu terminal **Pushbutton**.
3. Dari terminal seberang Pushbutton, sambungkan ke **Kaki Resistor 220 &Omega;**.
4. Sambungkan kaki resistor lainnya ke **Anoda (+) LED** (kaki melengkung).
5. Sambungkan **Katoda (&minus;) LED** (kaki lurus dengan takik pipih) ke **Kutub Negatif (&minus;) Baterai**.
6. Klik **Start Simulation**, lalu tekan pushbutton &rarr; LED menyala terang, stabil, dan aman.
7. **Uji Komparasi Kerusakan:** Hapus resistor, sambungkan baterai langsung ke anoda LED, lalu jalankan simulasi &rarr; Simulator Tinkercad langsung menampilkan **ikon ledakan bintang merah (Overcurrent Warning)**.

---

### Fase 2: Praktik 2 &ndash; Rangkaian LED + Kapasitor (Efek Fading Transien)
1. Tambahkan **Kapasitor Elektrolit 100 &mu;F** secara paralel terhadap sakelar dan beban.
2. Hubungkan **Kaki Positif (+) Kapasitor** (tanpa garis) ke jalur setelah pushbutton.
3. Hubungkan **Kaki Negatif (&minus;) Kapasitor** (bertanda garis setrip abu-abu) ke terminal negatif baterai.
4. Pasang **Resistor 1 k&Omega;** secara seri dengan Anoda LED, lalu hubungkan cabang ini paralel terhadap kedua kaki kapasitor.
5. Klik **Start Simulation**:
   - **Fase Charging:** Tekan dan tahan tombol selama 3 detik untuk mengisi muatan listrik ke pelat kapasitor.
   - **Fase Discharging:** Lepaskan tombol pushbutton.
   - **Amati Fenomena:** LED tidak langsung padam mendadak, melainkan meredup secara halus (*fade out*) selama beberapa detik karena energi listrik cadangan di dalam kapasitor perlahan dialirkan ke LED.
6. Ganti nilai kapasitansi menjadi **1.000 &mu;F**, amati waktu pemudaran yang berlangsung jauh lebih lama.

---

### Fase 3: Praktik 3 &ndash; Kendali Kecepatan Putar Motor DC
1. Siapkan **Baterai 9V**, **Potensiometer 10 k&Omega;**, dan **Motor DC**.
2. Sambungkan terminal (+) Baterai ke **Terminal 1 (Kiri)** Potensiometer.
3. Sambungkan terminal (&minus;) Baterai ke **Terminal 2 (Kanan)** Potensiometer sekaligus ke **Terminal Negatif Motor DC**.
4. Sambungkan **Pin Tengah (Wiper)** Potensiometer ke **Terminal Positif Motor DC**.
5. Jalankan simulasi, lalu putar tuas potensiometer:
   - **Putaran ke arah kiri (Hambatan Minimum):** Tegangan keluaran wiper &approx; 9V &rarr; **RPM Motor melaju kencang**.
   - **Putaran ke arah kanan (Hambatan Maksimum):** Tegangan terbagi mengecil &rarr; **RPM Motor melambat perlahan hingga berhenti**.

---

### Fase 4: Praktik 4 &ndash; Sistem Robot Otonom Cerdas (Arduino Uno)
Modul puncak ini memadukan sensor ultrasonik, modulasi kecepatan motor via sinyal PWM, buzzer alarm, dan lampu indikator visual.

Terapkan standar **Pewarnaan Kabel Tematik EduQuest**:
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 20px 0;">
  <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
    <strong style="color: #ef4444; display: block;">Kabel Merah</strong>
    <span style="font-size: 0.85rem; color: var(--text-main);"><strong>Jalur Tegangan (VCC):</strong> 5V dari pin Arduino ke sensor &amp; buzzer.</span>
  </div>

  <div style="background: rgba(15, 23, 42, 0.1); border-left: 4px solid #0f172a; padding: 12px 16px; border-radius: 0 8px 8px 0;">
    <strong style="color: var(--text-main); display: block;">Kabel Hitam</strong>
    <span style="font-size: 0.85rem; color: var(--text-main);"><strong>Jalur Arde (GND):</strong> Titik nol bersama seluruh sirkuit.</span>
  </div>

  <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 0 8px 8px 0;">
    <strong style="color: #3b82f6; display: block;">Kabel Biru &amp; Kuning</strong>
    <span style="font-size: 0.85rem; color: var(--text-main);"><strong>Sinyal Sensor:</strong> Pin Trigger (D9) &amp; Pin Echo (D8).</span>
  </div>

  <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 0 8px 8px 0;">
    <strong style="color: #10b981; display: block;">Kabel Hijau &amp; Oranye</strong>
    <span style="font-size: 0.85rem; color: var(--text-main);"><strong>Kontrol PWM &amp; LED:</strong> Pin D3 (Motor PWM) &amp; Pin D5/D6 (LED).</span>
  </div>
</div>

#### Skema Pin & Sambungan Robot
<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Komponen Target</th>
        <th style="width: 30%;">Pin Komponen</th>
        <th>Koneksi ke Arduino Uno</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="4"><strong>Sensor Jarak HC-SR04</strong></td>
        <td>VCC</td>
        <td>Pin <strong>5V</strong> Arduino</td>
      </tr>
      <tr>
        <td>GND</td>
        <td>Pin <strong>GND</strong> Arduino</td>
      </tr>
      <tr>
        <td>Trig (Trigger)</td>
        <td>Pin <strong>Digital 9</strong></td>
      </tr>
      <tr>
        <td>Echo</td>
        <td>Pin <strong>Digital 8</strong></td>
      </tr>
      <tr>
        <td rowspan="2"><strong>Motor DC (Aktuator Roda)</strong></td>
        <td>Terminal Positif (1)</td>
        <td>Pin <strong>Digital ~3</strong> (Kemampuan PWM Kontrol Laju)</td>
      </tr>
      <tr>
        <td>Terminal Negatif (2)</td>
        <td>Pin <strong>GND</strong></td>
      </tr>
      <tr>
        <td rowspan="2"><strong>Piezo Buzzer (Sirine)</strong></td>
        <td>Terminal Positif (+)</td>
        <td>Pin <strong>Digital 10</strong></td>
      </tr>
      <tr>
        <td>Terminal Negatif (&minus;)</td>
        <td>Pin <strong>GND</strong></td>
      </tr>
      <tr>
        <td><strong>LED Hijau (Status Aman)</strong></td>
        <td>Anoda (+) via Resistor 220 &Omega;</td>
        <td>Pin <strong>Digital 5</strong> (Katoda ke GND)</td>
      </tr>
      <tr>
        <td><strong>LED Merah (Status Bahaya)</strong></td>
        <td>Anoda (+) via Resistor 220 &Omega;</td>
        <td>Pin <strong>Digital 6</strong> (Katoda ke GND)</td>
      </tr>
    </tbody>
  </table>
</div>

#### Kode Program Kontrol Robotika (C++)
Buka jendela **Code &rarr; Text** di Tinkercad dan masukkan kode program berikut:

```cpp
// ===================================================================
// Proyek: Autonomous Emergency Braking & Obstacle Avoidance Robot
// Mata Pelajaran: Dasar-Dasar TJKT - MAN 2 Cianjur
// ===================================================================

const int trigPin   = 9;   // Pin Pemancar Gelombang Ultrasonik
const int echoPin   = 8;   // Pin Penerima Pantulan Gelombang
const int motorPin  = 3;   // Pin Penggerak Motor DC (Wajib Pin PWM ~3)
const int buzzerPin = 10;  // Pin Piezo Buzzer Alarm
const int ledHijau  = 5;   // Indikator Jalur Aman
const int ledMerah  = 6;   // Indikator Bahaya Tabrakan

long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(motorPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledHijau, OUTPUT);
  pinMode(ledMerah, OUTPUT);

  // Aktifkan komunikasi serial untuk memantau pembacaan jarak
  Serial.begin(9600);
  Serial.println("Sistem Sensor Robot Siap Beroperasi!");
}

void loop() {
  // 1. Pancarkan pulsa ultrasonik 10 mikrodetik
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // 2. Hitung durasi pantulan dan konversi ke satuan centimeter (cm)
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  // Tampilkan data telemetri ke Serial Monitor
  Serial.print("Jarak Rintangan: ");
  Serial.print(distance);
  Serial.println(" cm");

  // 3. Logika multi-zona keselamatan kendaraan otonom
  if (distance > 20) {
    // -------------------------------------------------------------
    // ZONA 1: JALUR AMAN (> 20 cm)
    // Motor melaju kecepatan penuh, LED hijau menyala, alarm hening
    // -------------------------------------------------------------
    analogWrite(motorPin, 255); // Nilai PWM Maksimal (100% Daya)
    digitalWrite(ledHijau, HIGH);
    digitalWrite(ledMerah, LOW);
    noTone(buzzerPin);
  } 
  else if (distance >= 10 && distance <= 20) {
    // -------------------------------------------------------------
    // ZONA 2: WASPADA MENDEKATI RINTANGAN (10 cm s.d. 20 cm)
    // Motor diperlambat separuh, kedua LED menyala, nada bip waspada
    // -------------------------------------------------------------
    analogWrite(motorPin, 100); // Nilai PWM Diturunkan (~40% Daya)
    digitalWrite(ledHijau, HIGH);
    digitalWrite(ledMerah, HIGH);
    tone(buzzerPin, 1000, 80);   // Frekuensi 1000 Hz, durasi 80 ms
  } 
  else {
    // -------------------------------------------------------------
    // ZONA 3: BAHAYA KRITIS (< 10 cm)
    // Rem mendadak (Motor STOP), LED merah penuh, sirine tanda bahaya
    // -------------------------------------------------------------
    analogWrite(motorPin, 0);   // Matikan motor (0% Daya)
    digitalWrite(ledHijau, LOW);
    digitalWrite(ledMerah, HIGH);
    tone(buzzerPin, 2000);      // Frekuensi tinggi 2000 Hz tanpa henti
  }
  
  delay(60); // Jeda stabilitas sampling sensor
}
```

---

## 📋 5. Lembar Kerja Praktikum (Quest Sheet)

<div class="article-card" style="margin: 28px 0; border: 2px solid var(--border);">
  <div style="text-align: center; margin-bottom: 20px;">
    <span class="card-tag tag-tkj" style="font-size: 0.75rem;">QUEST LOG ELEKTRONIKA</span>
    <h3 style="margin: 6px 0;">LEMBAR KERJA SISWA &bull; KODE: EQ-TJKT-CIRCUIT-01</h3>
  </div>

  <div style="background: var(--bg-alt); padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
    <p style="margin: 4px 0;"><strong>Nama Siswa:</strong> __________________________________________________</p>
    <p style="margin: 4px 0;"><strong>Kelas:</strong> X TJKT ______</p>
    <p style="margin: 4px 0;"><strong>Tanggal Uji:</strong> __________________________________________________</p>
  </div>

  <h4>Misi 1: Identifikasi Polaritas &amp; Proteksi Komponen</h4>
  <ol style="margin-bottom: 24px;">
    <li><strong>Ciri Fisik Kaki Anoda (+) pada Komponen LED:</strong> _________________________________</li>
    <li><strong>Ciri Fisik Kaki Negatif (&minus;) pada Kapasitor Elektrolit:</strong> _________________________________</li>
    <li><strong>Fungsi Resistor 220 &Omega; pada Pin Digital Output Arduino:</strong> _________________________________</li>
    <li><strong>Tanda Khusus pada Pin Arduino yang Mendukung Sinyal PWM:</strong> _________________________________</li>
  </ol>

  <h4>Misi 2: Tabel Analisis Pin-Point Komponen Rangkaian</h4>
  <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 12px;">
    Lengkapi fungsi dan analisis dampak kegagalan komponen pada sistem robotika cerdas:
  </p>

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th style="width: 8%; text-align: center;">No</th>
          <th style="width: 25%;">Nama Komponen</th>
          <th style="width: 35%;">Fungsi Utama Sirkuit</th>
          <th style="width: 32%;">Gejala Jika Komponen Rusak / Absen</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center;">1</td><td>Resistor 220 &Omega;</td><td>Membatasi arus masuk ke LED</td><td>LED meledak/putus seketika karena overcurrent</td></tr>
        <tr><td style="text-align: center;">2</td><td>Kapasitor 100 &mu;F</td><td>Penyimpan muatan peredam transien</td><td>Cahaya padam seketika tanpa efek pemudaran</td></tr>
        <tr><td style="text-align: center;">3</td><td>Potensiometer 10 k&Omega;</td><td>Pembagi tegangan manual analog</td><td>Kecepatan putar motor tidak dapat diatur</td></tr>
        <tr><td style="text-align: center;">4</td><td>Motor DC</td><td>Aktuator penggerak mekanik</td><td>Robot diam tidak bergerak meski sinyal aktif</td></tr>
        <tr><td style="text-align: center;">5</td><td>Sensor HC-SR04</td><td>Mengukur jarak halangan via sonar</td><td>Robot menabrak tembok karena jarak terbaca 0 cm</td></tr>
        <tr><td style="text-align: center;">6</td><td>Piezo Buzzer</td><td>Alarm audio peringatan tabrakan</td><td>Tidak ada sinyal suara peringatan saat zona bahaya</td></tr>
        <tr><td style="text-align: center;">7</td><td>LED Indikator Merah</td><td>Sinyal visual status darurat</td><td>Operator tidak mengetahui status pengereman aktif</td></tr>
        <tr><td style="text-align: center;">8</td><td>Arduino Uno R3</td><td>Pemroses instruksi dan algoritma</td><td>Seluruh sistem mati dan tidak merespons sensor</td></tr>
        <tr><td style="text-align: center;">9</td><td>Pin PWM ~3</td><td>Penyalur sinyal modulasi lebar pulsa</td><td>Motor hanya berjalan on/off tanpa variasi kecepatan</td></tr>
        <tr><td style="text-align: center;">10</td><td>Pushbutton Switch</td><td>Pemutus dan penghubung kontak arus</td><td>Aliran listrik terputus permanen jika sakelar macet</td></tr>
      </tbody>
    </table>
  </div>
</div>

---

## ⚖️ 6. Rubrik Penilaian Praktikum

Evaluasi pencapaian kompetensi siswa dinilai berdasarkan matriks objektivitas berikut:

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Kriteria Penilaian</th>
        <th style="width: 10%; text-align: center;">Bobot</th>
        <th>Sangat Baik (85 &ndash; 100)</th>
        <th>Cukup Baik (70 &ndash; 84)</th>
        <th>Kurang (&lt; 70)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ketepatan Wiring &amp; Polaritas</strong></td>
        <td style="text-align: center; font-weight: 800; color: var(--accent-orange);">30%</td>
        <td>Seluruh sambungan pin akurat, polaritas kapasitor/LED benar tanpa ada komponen korsleting.</td>
        <td>Rangkaian berfungsi sebagian, terdapat 1&ndash;2 kesalahan penempatan kabel non-kritis.</td>
        <td>Rangkaian korsleting atau komponen mengalami burnout akibat polaritas terbalik.</td>
      </tr>
      <tr>
        <td><strong>Logika Program &amp; Kalibrasi Jarak</strong></td>
        <td style="text-align: center; font-weight: 800; color: var(--accent-orange);">30%</td>
        <td>Kode C++ berjalan mulus, logika 3-zona keselamatan merespons sensor ultrasonik secara presisi.</td>
        <td>Kode berfungsi namun ambang batas jarak (threshold) kurang terkalibrasi dengan baik.</td>
        <td>Program error atau logika pengereman tidak merespons perubahan jarak rintangan.</td>
      </tr>
      <tr>
        <td><strong>Kerapian &amp; Color Coding Kabel</strong></td>
        <td style="text-align: center; font-weight: 800; color: var(--accent-orange);">20%</td>
        <td>Tata letak komponen rapi pada breadboard, warna kabel disiplin mengikuti standar EduQuest.</td>
        <td>Kabel terpasang benar tetapi penataan semrawut atau warna kabel bercampur acak.</td>
        <td>Penataan sangat berantakan dan menyulitkan proses penelusuran jalur (*tracing*).</td>
      </tr>
      <tr>
        <td><strong>Troubleshooting &amp; Analisis Kasus</strong></td>
        <td style="text-align: center; font-weight: 800; color: var(--accent-orange);">20%</td>
        <td>Mampu mendiagnosa dan memecahkan studi kasus kerusakan sirkuit dengan argumen teknis logis.</td>
        <td>Mampu menyelesaikan masalah namun penjelasan teorinya masih kurang mendalam.</td>
        <td>Gagal mendiagnosa penyebab kerusakan saat sirkuit mengalami malfungsi.</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 🕵️ 7. Tantangan Kasus: "The Circuit Detective"

Uji kemampuan pemecahan masalah teknisi Anda dengan membedah 2 studi kasus laboratorium berikut:

<div class="callout callout-warning">
  <strong style="font-size: 1.05rem;">Skenario Kerusakan di Meja Praktikum:</strong>
  <p style="margin-top: 8px;">
    <em>"Seorang siswa melaporkan bahwa saat simulasi robotika dijalankan, <strong>LED indikator merah langsung hancur dengan simbol bintang merah terbakar</strong>. Sementara itu, di meja sebelahnya, <strong>motor DC sama sekali tidak mau melambat meskipun jarak rintangan sudah memasuki zona waspada (15 cm)</strong>."</em>
  </p>
</div>

Klik dropdown di bawah untuk melihat analisis penyebab dan solusinya:

<div style="display: flex; flex-direction: column; gap: 14px; margin: 24px 0;">
  <details>
    <summary>Analisis Kasus 1: LED Meledak / Overcurrent Saat Simulasi</summary>
    <div style="padding-top: 14px;">
      <p style="margin-bottom: 8px;">
        <strong>Penyebab Utama:</strong> Siswa menghubungkan anoda LED langsung ke Pin Digital 5V Arduino tanpa menyisipkan <strong>Resistor Pembatas Arus (220 &Omega;)</strong> secara seri.
      </p>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0;">
        <strong>Solusi Lapangan:</strong> Pasang resistor 220 &Omega; di antara Pin Digital output dengan kaki anoda LED. Resistor akan menurunkan kelebihan voltase dari 5V menjadi 2V yang aman bagi semikonduktor LED.
      </p>
    </div>
  </details>

  <details>
    <summary>Analisis Kasus 2: Motor DC Tidak Melambat pada Sinyal PWM</summary>
    <div style="padding-top: 14px;">
      <p style="margin-bottom: 8px;">
        <strong>Penyebab Utama:</strong> Kabel kontrol motor dihubungkan ke <strong>Pin Digital Non-PWM (seperti Pin 2, 4, atau 7)</strong>. Pin biasa hanya mampu mengeluarkan sinyal biner murni (0V atau 5V), sehingga perintah <code>analogWrite(motorPin, 100)</code> diabaikan oleh mikrokontroler.
      </p>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0;">
        <strong>Solusi Lapangan:</strong> Pindahkan kabel terminal motor ke pin digital yang memiliki simbol tilde (PWM), seperti <strong>Pin ~3, ~5, ~6, ~9, ~10, atau ~11</strong> pada Arduino Uno.
      </p>
    </div>
  </details>
</div>

---

## 🎯 8. Kesimpulan & Refleksi Praktikum

Penguasaan sirkuit dasar di Tinkercad merupakan batu loncatan penting dalam karier rekayasa informatika dan robotika:
1. **Disiplin Proteksi:** Resistor adalah komponen murah penyelamat komponen mahal. Jangan pernah menyalakan sirkuit semikonduktor tanpa proteksi arus.
2. **Kestabilan Sinyal:** Kapasitor mengajarkan kita pentingnya manajemen daya halus (*smoothing*) untuk mencegah *noise* dan lonjakan tegangan transien.
3. **Kombinasi Hardware &amp; Software:** Logika pemrograman C++ Arduino menjadi berdaya guna ketika berhasil menggerakkan perangkat fisik di dunia nyata secara otonom.
