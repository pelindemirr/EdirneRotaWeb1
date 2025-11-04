# Assets Klasörü

Bu klasör projedeki statik varlıkları (resim, ikon, logo vb.) içerir.

## Klasör Yapısı

- `images/` - Resim dosyaları (jpg, png, webp)
- `icons/` - SVG ikonlar ve logo dosyları

## Kullanım

```tsx
// Resim import etme
import heroImage from "@/assets/images/edirne-hero.jpg";

// SVG ikon import etme
import logo from "@/assets/icons/logo.svg";
```

## Dosya Adlandırma

- Dosya adları kebab-case kullanın: `edirne-bridge.jpg`
- Açıklayıcı isimler kullanın
- Resim boyutlarını belirtin: `hero-1920x1080.jpg`
