# Google Drive Product Image Download Map

## Available Product Folders (PRODUTOS directory)
Access folder: https://drive.google.com/drive/folders/15MrWXPOTnsWHPAgMexAUuq0gBZZge0jO

### DERMOSEX Line (DS codes)
Each product folder contains 2–3 subfolders: **FOTOS HUMANIZADAS**, **FOTOS STUDIO**, and sometimes additional variants.

| Product Code | Folder Name | Folder ID |
|---|---|---|
| DS001 | CREME HIDRATANTE | 10DAaQ1IDRKddZ2rTP5GiMiUeF_EUvGED |
| DS002 | ESFOLIANTE | 1DZ30JdJyTU9iiEvFIRals5FgNcYjXITg |
| DS003 | TÔNICO | 1jE37Apw71PAtBeDVxYPXj7rYKAVKQ4E2 |
| DS004 | CLAREADOR | 16PHbcAVho-Og2IgTUY37OQi8eW6ttIQR |
| DS005 | ESPUMA | 1uKIfKSYvGh1_3jsB8n532aIFd_-Jya15 |
| DS006 | SABONETE ANAL | 1xrt_fHvr_5jUqhSyHSo7AAuSODiILG8n |
| DS007 | GEL LUBRIFICANTE E HIDRATANTE | 1EU1LN1-nGFUpc8eYqlHqzM52AvWIdIeI |
| DS008 | DESODORANTE | 1tmqqYUhqm-_xOOOeRzvIqvEGKDaUPfoD |
| DS009 | SABONETE | 1BXeWW0fQcbyrnvVREvLuvKKjgJYkRaRl |
| DS010 | ÁGUA THERMAL | 1RwLlIKT2Jx7XipqUvf8LEBZWnwUQtNrv |
| DS011 | SÉRUM | 1IT6Od5auNYxWCWscSP_noPXNnF8OPdRj |
| DS012 | ÓLEO MINERAL | 1XUkE37cu_jD7-V7oLNKXKlVkEIxhnags |
| DS017 | DEO MASCULINO | 1plDE1C6NgcV9q1G2RNX3NRA53vtGzCRy |
| DS018 | SABONETE FEMININO | 1kVaSEwufLencoWBFPVjDSIIB8UcppOs5 |
| DS019 | SABONETE MASCULINO | 1Jq3MuFKB98TP_lDPdL1eo0158ioOCml7 |
| DS020 | TALCO ÍNTIMO | 1HpkjwR-eZojRmit1EOjBne-_NNV6xnrb |
| DS021 | CREME CORPORAL | 1XR4-RTj4IMl_Cy1pq0jKHqNCjg4zJkie |
| DS022 | SÉRUM CONCENTRADO | 1wOmX3xiJKP9UyU63_M_7-XvxdNKy-Hf1 |
| DS024 | ÁGUA REFRESCANTE | 1O8WVwrtS_G7dgvzB2e624o4AczTSb0Ms |

### MY MOMENT & MY ONE Lines (IA codes)
| Product Code | Folder Name | Folder ID |
|---|---|---|
| IA424 | MY MOMENT | 1t2ivZpcRmrafUgkvZA84G1FS9bX_mHUR |
| IA443 | MY ONE | 1OM3d1lphImV4xqcWMlnB6d37P-VSpMfL |
| IA449 | MY TOUCH | 1b-K7mshpZc5q0m5YyOzh8JZo4wdqgSq- |

### Other Categories
- **2 - MATURE** (mature product line): 12rFGpQ66mZcltD1K3KIuRpYHglr1rrlU
- **1 - LINHA COMPLETA DERMOSEX** (complete DERMOSEX line): 15WBu1upJDCwYFVki1cWnThehg7gTqyYU

---

## Download Status
✅ **Successfully tested** with DS001:
- Downloaded 9/10 images (~55 MB)
- Authenticated download working via Google Drive cookies
- Images stored in: `data/drive-images/DS001/`

## Next Steps
1. **Confirm which 47 product codes** you need (or provide the exact list)
2. Script will:
   - Traverse each product folder → subfolders
   - Extract all image file IDs
   - Download all images to `data/drive-images/{CODE}/`
   - Generate CSV manifest with file names, folder paths, and download status

## Usage
```bash
python3 download_drive_images.py --codes DS001 DS002 IA424 ...
```

---
**Last Updated:** 2026-06-07 23:14 UTC
