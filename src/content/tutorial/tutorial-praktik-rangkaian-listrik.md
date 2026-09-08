---
title: "Panduan Praktik Rangkaian Listrik & Simulasi Tinkercad: Dari Sirkuit LED hingga Robot Cerdas"
description: "Panduan praktikum elektronika dasar dan simulasi sirkuit di Autodesk Tinkercad: resistor pembatas arus, charging kapasitor, kendali RPM motor DC, hingga integrasi robotika cerdas berbasis Arduino Uno."
pubDate: 2026-09-08
tags: ["elektronika", "tinkercad", "arduino", "robotika", "tutorial", "sirkuit"]
duration: 9
---

Simulasi elektronika berbasis virtual seperti **Autodesk Tinkercad Circuits** memberikan lingkungan belajar yang aman, gratis, dan bebas risiko bagi siswa sebelum merangkai komponen fisik di laboratorium. Anda dapat bereksperimen, menguji batas toleransi komponen, hingga melihat simulasi kerusakan (*overcurrent*) tanpa khawatir komponen terbakar sungguhan.

Panduan modul praktikum ini disusun secara berjenjang dalam **4 level pembelajaran**: mulai dari proteksi komponen sederhana, efek transien kapasitor, modulasi kecepatan motor, hingga perakitan sistem robotika otonom cerdas.

---

## 🗺️ Peta Jalur Praktikum (Learning Roadmap)

<div class="feature-grid-3">
  <div class="feature-card">
    <div class="feature-icon-badge">💡</div>
    <h4 style="margin-bottom: 8px;">Praktik 1: Rangkaian LED</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      Memahami peran vital <strong>Resistor</strong> sebagai pembatas arus (<em>current limiter</em>) agar komponen semikonduktor tidak meledak/terbakar.
    </p>
  </div>

  <div class="feature-card">
    <div class="feature-icon-badge">🔋</div>
    <h4 style="margin-bottom: 8px;">Praktik 2: LED + Kapasitor</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      Memahami fungsi <strong>Kapasitor</strong> sebagai penyimpan muatan sementara yang menghasilkan efek tunda daya / pemudaran cahaya (<em>fading effect</em>).
    </p>
  </div>

  <div class="feature-card">
    <div class="feature-icon-badge">⚙️</div>
    <h4 style="margin-bottom: 8px;">Praktik 3: Motor DC &amp; RPM</h4>
    <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0;">
      Mengendalikan laju kecepatan putar (RPM) motor listrik menggunakan variasi hambatan <strong>Potensiometer</strong> dan prinsip pembagi tegangan.
    </p>
  </div>
</div>

<div class="article-card" style="border-left: 4px solid var(--accent-orange); margin: 20px 0 32px 0;">
  <strong style="color: var(--accent-orange); display: block; margin-bottom: 6px; font-size: 1.05rem;">
    🤖 Praktik 4 (Puncak Proyek): Smart Obstacle-Avoidance Robot System
  </div>
  <p style="font-size: 0.925rem; color: var(--text-muted); margin: 0;">
    Mengintegrasikan seluruh konsep Praktik 1&ndash;3 ke dalam otak mikrokontroler <strong>Arduino Uno</strong>: membaca jarak ultrasonik (HC-SR04), mengatur rem otomatis via sinyal PWM, mengaktifkan sirine bahaya piezo buzzer, dan indikator visual status dual-LED.
  </p>
</div>

---

## ⚡ Praktik 1: Rangkaian LED & Resistor Pembatas Arus

### 1. Landasan Teori & Analisis Masalah
Sebuah lampu LED (*Light Emitting Diode*) memiliki tegangan kerja maju (*Forward Voltage / V<sub>F</sub>*) rata-rata hanya **1,8V hingga 2,2V** dengan batas arus aman maksimum **0,02 A (20 mA)**. 

Jika LED dihubungkan langsung ke baterai 9 Volt tanpa hambatan:
- Arus yang mengalir akan melonjak drastis melewati batas ketahanan kristal semikonduktor.
- Terjadi fenomena *Thermal Runaway* (panas berlebih seketika), menyebabkan kawat ikatan (*bonding wire*) putus atau LED meledak.

Untuk menghitung nilai resistor pembatas yang ideal:

<div class="formula-card">
  <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">
    Rumus Resistor Pembatas LED
  </div>
  <div class="formula-math" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
    <span>R =</span>
    <span style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; font-size: 0.85em;">
      <span style="border-bottom: 2px solid var(--accent-orange); padding: 0 8px 3px 8px;">V<sub>sumber</sub> &minus; V<sub>LED</sub></span>
      <span style="padding-top: 3px;">I<sub>LED</sub></span>
    </span>
  </div>
  <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 6px; margin-bottom: 0;">
    <em>R = (9V &minus; 2V) / 0,02A = 7V / 0,02A = <strong>350 &Omega;</strong> (digunakan resistor 220 &Omega; &ndash; 330 &Omega; standar lab).</em>
  </p>
</div>

### 2. Daftar Komponen
- 1&times; Baterai 9V (Power Source)
- 1&times; Resistor 220 &Omega; (Merah &ndash; Merah &ndash; Cokelat &ndash; Emas)
- 1&times; LED (Warna bebas)
- 1&times; Sakelar Pushbutton
- Breadboard &amp; Kabel Jumper secukupnya

### 3. Langkah Perakitan Rangkaian Seri
1. Tarik kabel dari **Kutub Positif (+) Baterai 9V** ke salah satu terminal kaki **Pushbutton**.
2. Hubungkan terminal seberang Pushbutton ke salah satu kaki **Resistor 220 &Omega;**.
3. Hubungkan kaki resistor lainnya ke **Anoda (+) LED** (kaki yang lebih panjang / agak melengkung di Tinkercad).
4. Hubungkan **Katoda (&minus;) LED** (kaki berbidang pipih) kembali ke **Kutub Negatif (&minus;) Baterai**.

### 4. Poin Pengamatan Simulasi
- **Pengujian Normal:** Tekan tombol pushbutton &rarr; LED menyala terang, stabil, dan aman.
- **Uji Kerusakan (Bandingkan):** Hapus resistor, lalu sambungkan kutub positif baterai langsung ke anoda LED. Jalankan simulasi dan tekan tombol &rarr; Simulator Tinkercad akan langsung menampilkan **ikon ledakan bintang merah / peringatan terbakar**, menginformasikan bahwa arus yang masuk melampaui batas toleransi (arus melonjak hingga &plusmn;900 mA).

---

## 🔋 Praktik 2: Rangkaian LED + Kapasitor (Penyimpan Muatan & Efek Fading)

### 1. Landasan Teori
**Kapasitor Elektrolit (*Elco*)** adalah komponen yang mampu menyerap dan menyimpan energi listrik dalam bentuk medan elektrostatik saat diberi tegangan (*Charging*), lalu melepaskannya kembali ke sirkuit saat tegangan utama terputus (*Discharging*).

Dalam rangkaian paralel dengan beban, kapasitor bertindak sebagai **tandon penampung cadangan**, menghasilkan transisi pemudaran cahaya (*fade out*) yang halus.

### 2. Daftar Komponen
- 1&times; Baterai 9V
- 1&times; Kapasitor Elektrolit (Gunakan nilai **100 &mu;F** atau **1.000 &mu;F / 16V**)
- 1&times; Resistor 1 k&Omega; (Cokelat &ndash; Hitam &ndash; Merah &ndash; Emas)
- 1&times; LED
- 1&times; Sakelar Pushbutton

### 3. Langkah Perakitan
Rangkaian ini menggabungkan cabang paralel antara sumber, tandon kapasitor, dan beban LED:

1. **Jalur Pengisian Kapasitor:**
   - Sambungkan terminal (+) Baterai ke kaki Sakelar.
   - Dari kaki keluar sakelar, hubungkan ke **Kaki Positif (+) Kapasitor** (perhatikan polaritas: kaki tanpa garis tanda minus).
   - Hubungkan **Kaki Negatif (&minus;) Kapasitor** (sisi bertanda garis setrip abu-abu) ke terminal (&minus;) Baterai.
2. **Jalur Beban LED:**
   - Pasang **Resistor 1 k&Omega;** secara seri ke Anoda (+) LED.
   - Hubungkan kombinasi resistor + LED ini secara **paralel terhadap kedua kaki kapasitor**.

### 4. Poin Pengamatan Simulasi
1. **Fase Pengisian (*Charging*):** Tekan dan tahan sakelar selama 3&ndash;5 detik. Listrik mengalir mengisi pelat kapasitor hingga penuh bersamaan dengan menyalanya LED.
2. **Fase Pengosongan (*Discharging*):** Lepaskan sakelar.
   - Perhatikan: **LED tidak langsung mati seketika!**
   - LED akan meredup secara perlahan (*fade out*) selama 2&ndash;4 detik. Cahaya bertahan karena kapasitor membuang sisa muatan elektronnya melalui resistor ke LED hingga voltase habis.
3. **Eksperimen Nilai Kapasitansi:** Ganti nilai kapasitor dari 100 &mu;F menjadi 1.000 &mu;F. Waktu redup (*delay time*) akan berlangsung jauh lebih lama karena kapasitas tandon muatan 10 kali lebih besar.

---

## ⚙️ Praktik 3: Rangkaian Motor DC (Pengaturan Kecepatan / RPM)

### 1. Landasan Teori
Kecepatan putar poros motor listrik arus searah (Motor DC) berbanding lurus dengan besar tegangan efektif yang diterimanya. 

Untuk mengubah kecepatan tanpa memotong tegangan sumber baterai, kita dapat menggunakan **Potensiometer** (resistor variabel 3 kaki) yang berfungsi sebagai **pembagi tegangan (*Voltage Divider*)**.

### 2. Daftar Komponen
- 1&times; Baterai 9V
- 1&times; Motor DC Mini (Hobby Gearmotor)
- 1&times; Potensiometer 10 k&Omega;

### 3. Langkah Perakitan
Potensiometer memiliki 3 kaki: Terminal 1, Wiper (Kaki Tengah), dan Terminal 2:

1. Hubungkan **Kutub Positif (+) Baterai** ke **Terminal 1 (Kiri)** Potensiometer.
2. Hubungkan **Terminal 2 (Kanan)** Potensiometer ke **Kutub Negatif (&minus;) Baterai**.
3. Hubungkan **Kaki Tengah (Wiper)** Potensiometer ke **Terminal 1 Motor DC**.
4. Hubungkan **Terminal 2 Motor DC** kembali ke **Kutub Negatif (&minus;) Baterai**.

### 4. Poin Pengamatan Simulasi
- Klik dan geser tuas putar potensiometer saat simulasi berjalan:
  - **Diputar ke arah hambatan minimum (mendekati Terminal 1):** Tegangan keluaran wiper mendekati 9V &rarr; **RPM Motor meningkat drastis** (putaran kencang).
  - **Diputar ke arah hambatan maksimum:** Tegangan keluaran wiper turun mendekati 0V &rarr; **RPM Motor menurun melambat hingga berhenti total**.
- *Catatan Efisiensi:* Pada dunia industri modern, penurunan RPM menggunakan resistor murni dianggap membuang energi menjadi panas. Sebagai gantinya, digunakan teknik **PWM (Pulse Width Modulation)** yang akan kita praktikkan pada modul robotika berikutnya!

---

## 🤖 Praktik 4: Proyek Robot Cerdas (Autonomous Braking System)

Praktik puncak ini mengintegrasikan seluruh elemen: kendali motor, sensor ultrasonik, alarm suara, dan indikator visual ke dalam kontrol logika pemrograman mikrokontroler **Arduino Uno**.

Robot dirancang memiliki sistem pengereman darurat otomatis (*Autonomous Emergency Braking*):

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Zona Deteksi</th>
        <th style="width: 20%;">Status Gerak Motor</th>
        <th style="width: 28%;">Indikator Visual (LED)</th>
        <th>Indikator Audio (Buzzer)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zona Aman</strong><br /><small style="color: var(--text-muted);">&gt; 20 cm</small></td>
        <td><span class="card-tag tag-tkj" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981;">MAKSIMAL (PWM 255)</span></td>
        <td>LED Hijau <strong>MENYALA</strong> &bull; LED Merah MATI</td>
        <td>Buzzer <strong>SUNYI</strong> (Tanpa suara)</td>
      </tr>
      <tr>
        <td><strong>Zona Waspada</strong><br /><small style="color: var(--text-muted);">10 cm &ndash; 20 cm</small></td>
        <td><span class="card-tag tag-tkj" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid #f59e0b;">MELAMBAT (PWM 100)</span></td>
        <td>LED Hijau &amp; LED Merah <strong>KEDUANYA MENYALA</strong></td>
        <td>Buzzer berbunyi <strong>BIP SINGKAT</strong> berkala</td>
      </tr>
      <tr>
        <td><strong>Zona Bahaya</strong><br /><small style="color: var(--text-muted);">&lt; 10 cm</small></td>
        <td><span class="card-tag tag-tkj" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid #ef4444;">STOP TOTAL (PWM 0)</span></td>
        <td>LED Hijau MATI &bull; LED Merah <strong>MENYALA PENUH</strong></td>
        <td>Buzzer berbunyi <strong>NADA TINGGI TERUS-MENERUS</strong></td>
      </tr>
    </tbody>
  </table>
</div>

---

### 1. Skema Pengkabelan Pin Arduino Uno

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Komponen</th>
        <th style="width: 30%;">Pin Komponen</th>
        <th>Koneksi ke Arduino Uno</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="4"><strong>Sensor Ultrasonik (HC-SR04)</strong></td>
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
        <td rowspan="2"><strong>Motor DC (Aktuator)</strong></td>
        <td>Terminal Positif (1)</td>
        <td>Pin <strong>Digital ~3</strong> (Pin PWM bertanda tilde)</td>
      </tr>
      <tr>
        <td>Terminal Negatif (2)</td>
        <td>Pin <strong>GND</strong></td>
      </tr>
      <tr>
        <td rowspan="2"><strong>Piezo Buzzer (Alarm)</strong></td>
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

---

### 2. Kode Program Arduino (C++)

Salin dan tempelkan kode berikut ke dalam jendela **Code &rarr; Text** di Tinkercad:

```cpp
// ================================================================
// Proyek: Smart Obstacle Avoidance & Automatic Braking Robot
// Modul: Praktikum Elektronika Dasar & Arduino - TJKT MAN 2 Cianjur
// ================================================================

// Definisi Pemetaan Pin
const int trigPin   = 9;   // Pin Trigger Ultrasonik
const int echoPin   = 8;   // Pin Echo Ultrasonik
const int motorPin  = 3;   // Pin Motor DC (Wajib pin berkemampuan PWM ~3)
const int buzzerPin = 10;  // Pin Piezo Buzzer
const int ledHijau  = 5;   // Pin Indikator Aman
const int ledMerah  = 6;   // Pin Indikator Bahaya

long duration;
int distance;

void setup() {
  // Inisialisasi Mode Pin
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(motorPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledHijau, OUTPUT);
  pinMode(ledMerah, OUTPUT);

  // Mulai Komunikasi Serial untuk Debugging di Monitor
  Serial.begin(9600);
  Serial.println("Sistem Sensor Robot Siap!");
}

void loop() {
  // 1. Pancarkan Gelombang Ultrasonik (Trig Pulses)
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // 2. Tangkap Pantulan Gelombang dan Konversi ke Jarak (cm)
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  // Cetak hasil pembacaan jarak ke Serial Monitor
  Serial.print("Jarak Rintangan: ");
  Serial.print(distance);
  Serial.println(" cm");

  // 3. Logika Kendali Multi-Zona Robot
  if (distance > 20) {
    // -------------------------------------------------------------
    // KONDISI 1: JALUR AMAN (> 20 cm)
    // Motor melaju kencang, LED hijau menyala, buzzer senyap
    // -------------------------------------------------------------
    analogWrite(motorPin, 255); // Nilai PWM Maksimal (Kecepatan 100%)
    digitalWrite(ledHijau, HIGH);
    digitalWrite(ledMerah, LOW);
    noTone(buzzerPin);
  } 
  else if (distance >= 10 && distance <= 20) {
    // -------------------------------------------------------------
    // KONDISI 2: ZONA WASPADA (10 cm s/d 20 cm)
    // Motor diperlambat separuh, kedua LED menyala, alarm bip pendek
    // -------------------------------------------------------------
    analogWrite(motorPin, 100); // Nilai PWM Diturunkan (Kecepatan ~40%)
    digitalWrite(ledHijau, HIGH);
    digitalWrite(ledMerah, HIGH);
    tone(buzzerPin, 1000, 80);   // Frekuensi 1000 Hz, durasi 80 ms
  } 
  else {
    // -------------------------------------------------------------
    // KONDISI 3: ZONA BAHAYA KRITIS (< 10 cm)
    // Rem mendadak (Motor STOP), LED merah penuh, sirine tanda bahaya
    // -------------------------------------------------------------
    analogWrite(motorPin, 0);   // Matikan daya motor (Kecepatan 0%)
    digitalWrite(ledHijau, LOW);
    digitalWrite(ledMerah, HIGH);
    tone(buzzerPin, 2000);      // Frekuensi tinggi 2000 Hz terus-menerus
  }
  
  // Waktu jeda stabilitas sampling sensor
  delay(60);
}
```

---

## 🎯 Kesimpulan Inti Praktikum

Melalui 4 modul praktikum ini, Anda telah menguasai benang merah arsitektur perangkat keras:
1. **Resistor** mencegah lonjakan arus yang menghancurkan sirkuit rapuh.
2. **Kapasitor** menjaga kontinuitas dan kehalusan distribusi listrik pada kondisi transien.
3. **Potensiometer &amp; PWM** memberikan kontrol dinamis terhadap gerakan mekanik aktuator.
4. **Mikrokontroler** menyatukan data sensor, logika komputasi, dan respons aktuator menjadi satu kesatuan sistem otomasi industri modern.
