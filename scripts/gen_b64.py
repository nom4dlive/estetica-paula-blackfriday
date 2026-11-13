import base64

img_path = r'F:\Organizado\03_CRM_SISTEMAS_CLIENTE\estetica-paula-blackfriday\public\assets\brand\logo-horizontal-border.png'
with open(img_path, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')

data_uri = f'data:image/png;base64,{b64}'
out_file = r'F:\Organizado\03_CRM_SISTEMAS_CLIENTE\estetica-paula-blackfriday\src\utils\brandLogoBase64.js'

with open(out_file, 'w', encoding='utf-8') as f:
    f.write('// Embedded base64 of official Dra. Paula Feliciano logo for jsPDF headers\n')
    f.write(f'export const BRAND_LOGO_BASE64 = "{data_uri}";\n')

print('brandLogoBase64.js generated successfully. Length:', len(data_uri))
