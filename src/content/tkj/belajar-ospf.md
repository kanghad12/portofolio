---
title: Panduan Praktis Konfigurasi Routing OSPF v7 pada RouterBoard MikroTik
description: Membangun arsitektur jaringan skala laboratorium sekolah dengan dynamic routing OSPF untuk pembagian beban trafik secara otomatis.
pubDate: 2026-08-05
category: MikroTik
tags: [mikrotik, networking, ospf, routing]
duration: 6
---

Routing OSPF (Open Shortest Path First) adalah protokol routing dinamis jenis *link-state* yang sangat efisien untuk mengelola routing dalam jaringan skala menengah hingga besar. Di lingkungan sekolah (laboratorium TKJ), mengajarkan OSPF memberi siswa pemahaman bagaimana internetwork berskala besar bekerja secara otomatis tanpa perlu entri rute statis satu per satu.

Pada modul ini, kita akan membahas cara mengonfigurasi OSPF pada MikroTik RouterOS v7. Perlu dicatat bahwa terdapat perbedaan konfigurasi OSPF yang cukup signifikan antara RouterOS v6 dan v7.

## Topologi Jaringan Lab
Kita akan menggunakan 2 buah Routerboard (R1 dan R2) yang saling terhubung melalui interface `ether1`.
- **R1 LAN**: `192.168.10.0/24`
- **R2 LAN**: `192.168.20.0/24`
- **Inter-Router Link**: `10.10.10.0/30` (R1 `10.10.10.1`, R2 `10.10.10.2`)

---

## Langkah 1: Konfigurasi IP Address
Langkah awal adalah menetapkan alamat IP pada setiap interface masing-masing router.

Di **Router R1**:
```bash
/ip address add address=192.168.10.1/24 interface=ether2-LAN
/ip address add address=10.10.10.1/30 interface=ether1-Link
```

Di **Router R2**:
```bash
/ip address add address=192.168.20.1/24 interface=ether2-LAN
/ip address add address=10.10.10.2/30 interface=ether1-Link
```

---

## Langkah 2: Konfigurasi Instance OSPF v7
Di RouterOS v7, OSPF dikonfigurasi melalui menu `/routing ospf`. Kita perlu mendefinisikan *instance* terlebih dahulu.

Di **Router R1**:
```bash
/routing ospf instance add name=ospf-instance-R1 version=2 router-id=1.1.1.1
```

Di **Router R2**:
```bash
/routing ospf instance add name=ospf-instance-R2 version=2 router-id=2.2.2.2
```

---

## Langkah 3: Konfigurasi Area OSPF
Setelah instance dibuat, kita tentukan area. Default area adalah backbone (`area 0` / `0.0.0.0`).

Di **Router R1**:
```bash
/routing ospf area add name=backbone-R1 instance=ospf-instance-R1 area-id=0.0.0.0
```

Di **Router R2**:
```bash
/routing ospf area add name=backbone-R2 instance=ospf-instance-R2 area-id=0.0.0.0
```

---

## Langkah 4: Daftarkan Interface OSPF (Interface Template)
Di RouterOS v7, kita tidak lagi mendaftarkan *network* secara langsung, melainkan mendefinisikan interface mana saja yang akan berpartisipasi dalam OSPF menggunakan *Interface Templates*.

Di **Router R1**:
```bash
# Daftarkan link inter-router
/routing ospf interface-template add interfaces=ether1-Link area=backbone-R1
# Daftarkan interface LAN sebagai passive (tidak mengirim hello packet ke client)
/routing ospf interface-template add interfaces=ether2-LAN area=backbone-R1 passive=yes
```

Di **Router R2**:
```bash
/routing ospf interface-template add interfaces=ether1-Link area=backbone-R2
/routing ospf interface-template add interfaces=ether2-LAN area=backbone-R2 passive=yes
```

---

## Langkah 5: Verifikasi Status OSPF
Setelah kedua router terkonfigurasi, periksa apakah hubungan tetangga (*neighbor*) sudah terbentuk.

```bash
/routing/ospf/neighbor/print
```

Jika berhasil, status neighbor harus menunjukkan **Full**. Sekarang coba lakukan ping antar PC client di bawah R1 dan R2. Jalur dinamis telah berhasil dipetakan!
