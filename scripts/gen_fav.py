import xml.etree.ElementTree as ET
import re

svg_file = r'F:\Organizado\03_CRM_SISTEMAS_CLIENTE\estetica-paula-blackfriday\public\assets\brand\logo-vertical.svg'
tree = ET.parse(svg_file)
root = tree.getroot()

paths = []
for el in root.iter():
    if el.tag.endswith('path'):
        d = el.attrib.get('d', '')
        nums = [float(n) for n in re.findall(r'[-+]?\d*\.?\d+', d)]
        ys = nums[1::2] if nums else []
        if ys and min(ys) < 600:
            opacity = el.attrib.get('opacity', '1.00')
            paths.append(f'<path d="{d}" fill="#CBB68B" opacity="{opacity}" />')

fav_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="500 30 490 490">
  <rect width="490" height="490" x="500" y="30" rx="90" fill="#07090E" />
  {' '.join(paths)}
</svg>'''

fav_path = r'F:\Organizado\03_CRM_SISTEMAS_CLIENTE\estetica-paula-blackfriday\public\favicon.svg'
with open(fav_path, 'w', encoding='utf-8') as f:
    f.write(fav_content)

print('favicon.svg generated successfully with', len(paths), 'paths.')
